// Private admin dashboard API — never exposed to the public
// All data is fetched server-side; keys never reach the browser

export async function GET(req) {
  // Password check
  const auth = req.headers.get('x-admin-password')
  if (auth !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [stripe, revenuecat, anthropic, subscribers] = await Promise.all([
    fetchStripe(),
    fetchRevenueCat(),
    fetchAnthropicUsage(),
    fetchSubscriberHistory(),
  ])

  return Response.json({ stripe, revenuecat, anthropic, subscribers, fetchedAt: new Date().toISOString() })
}

// ── Stripe ────────────────────────────────────────────────────────
async function fetchStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return { error: 'No Stripe key configured' }

  try {
    const headers = {
      Authorization: 'Basic ' + Buffer.from(key + ':').toString('base64'),
    }

    // Current balance
    const balanceRes = await fetch('https://api.stripe.com/v1/balance', { headers })
    const balance = await balanceRes.json()

    // Active subscriptions
    const subsRes = await fetch(
      'https://api.stripe.com/v1/subscriptions?status=active&limit=100&' +
      'expand%5B%5D=data.items.data.price.product',
      { headers }
    )
    const subs = await subsRes.json()

    // Recent charges (last 60 days)
    const since = Math.floor(Date.now() / 1000) - 60 * 24 * 60 * 60
    const chargesRes = await fetch(
      `https://api.stripe.com/v1/charges?limit=100&created[gte]=${since}`,
      { headers }
    )
    const charges = await chargesRes.json()

    // Recent payouts
    const payoutsRes = await fetch(
      'https://api.stripe.com/v1/payouts?limit=6',
      { headers }
    )
    const payouts = await payoutsRes.json()

    // Summarise charges by month
    const monthlyRevenue = {}
    for (const charge of charges.data || []) {
      if (charge.status !== 'succeeded') continue
      const d = new Date(charge.created * 1000)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      monthlyRevenue[key] = (monthlyRevenue[key] || 0) + charge.amount / 100
    }

    // Product breakdown from active subscriptions
    const productBreakdown = {}
    let stripeMRR = 0
    for (const sub of subs.data || []) {
      for (const item of sub.items?.data || []) {
        const price   = item.price || {}
        const product = price.product || {}
        const name    = typeof product === 'object' ? product.name : 'Unknown'
        const amt     = (price.unit_amount || 0) / 100
        productBreakdown[name] = (productBreakdown[name] || 0) + 1
        stripeMRR += amt
      }
    }

    return {
      pendingBalance: (balance.pending?.[0]?.amount || 0) / 100,
      availableBalance: (balance.available?.[0]?.amount || 0) / 100,
      activeSubscriptions: subs.data?.length || 0,
      stripeMRR,
      productBreakdown,
      monthlyRevenue,
      recentPayouts: (payouts.data || []).slice(0, 5).map(p => ({
        amount:      p.amount / 100,
        arrivalDate: new Date(p.arrival_date * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status:      p.status,
      })),
      recentCharges: (charges.data || []).slice(0, 10).map(c => ({
        amount:      c.amount / 100,
        date:        new Date(c.created * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        status:      c.status,
        description: c.description || 'Charge',
      })),
    }
  } catch (err) {
    return { error: err.message }
  }
}

// ── Anthropic Usage (via Supabase token log) ──────────────────────
async function fetchAnthropicUsage() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return { error: 'No Supabase credentials configured' }

  try {
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const res = await fetch(
      `${url}/rest/v1/api_usage?created_at=gte.${startOfMonth.toISOString()}&select=input_tokens,output_tokens`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    )
    const rows = await res.json()
    if (!Array.isArray(rows)) return { error: 'Unexpected Supabase response' }

    const totalInput  = rows.reduce((s, r) => s + (r.input_tokens  || 0), 0)
    const totalOutput = rows.reduce((s, r) => s + (r.output_tokens || 0), 0)

    // claude-sonnet-4-6: $3/MTok input · $15/MTok output
    const estimatedCost = Math.round(
      ((totalInput * 3) + (totalOutput * 15)) / 1_000_000 * 100
    ) / 100

    return { totalCalls: rows.length, totalInputTokens: totalInput, totalOutputTokens: totalOutput, estimatedCost }
  } catch (err) {
    return { error: err.message }
  }
}

// ── Subscriber History (Stripe + RevenueCat daily counts) ─────────
async function fetchSubscriberHistory() {
  const stripeKey = process.env.STRIPE_SECRET_KEY
  const rcKey     = process.env.REVENUECAT_API_KEY
  const projectId = process.env.REVENUECAT_PROJECT_ID || 'proj54ac425e'

  // 42 days = 6 weeks, oldest first
  const days = Array.from({ length: 42 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (41 - i))
    return d.toISOString().slice(0, 10)
  })

  // ── Stripe daily counts ──────────────────────────────────────────
  const stripeHistory = Object.fromEntries(days.map(d => [d, 0]))
  try {
    const headers = { Authorization: 'Basic ' + Buffer.from(stripeKey + ':').toString('base64') }
    const res  = await fetch('https://api.stripe.com/v1/subscriptions?limit=100&status=all', { headers })
    const data = await res.json()
    for (const day of days) {
      const dayStart = new Date(day).getTime() / 1000
      const dayEnd   = dayStart + 86400
      stripeHistory[day] = (data.data || []).filter(s => {
        if (s.created >= dayEnd) return false       // not created yet on this day
        if (s.cancel_at_period_end) return false    // user cancelled — don't count even in grace period
        if (['active', 'past_due', 'trialing'].includes(s.status)) return true
        if (s.status === 'canceled') return s.canceled_at && s.canceled_at > dayStart
        return false
      }).length
    }
  } catch (e) { console.error('Stripe history error:', e.message) }

  // ── RevenueCat daily counts ──────────────────────────────────────
  const rcHistory = Object.fromEntries(days.map(d => [d, 0]))
  try {
    const headers  = { Authorization: `Bearer ${rcKey}`, 'Content-Type': 'application/json' }
    const start    = encodeURIComponent(days[0] + 'T00:00:00Z')
    const end      = encodeURIComponent(days[days.length - 1] + 'T23:59:59Z')
    const res      = await fetch(
      `https://api.revenuecat.com/v2/projects/${projectId}/charts/active_subscriptions?resolution=P1D&start_time=${start}&end_time=${end}`,
      { headers }
    )
    const chart = await res.json()
    for (const pt of (chart.values || chart.data || [])) {
      const dateKey = (pt.date || pt.period || '').slice(0, 10)
      if (dateKey && rcHistory[dateKey] !== undefined) rcHistory[dateKey] = pt.value || 0
    }

    // If charts API returned all zeros, fall back to current active count from overview
    const allZero = Object.values(rcHistory).every(v => v === 0)
    if (allZero) {
      const overviewRes = await fetch(
        `https://api.revenuecat.com/v2/projects/${projectId}/metrics/overview`,
        { headers }
      )
      const overview    = await overviewRes.json()
      const metricsArr  = Array.isArray(overview) ? overview : (overview.metrics || overview.data || [])
      const metricsMap  = Object.fromEntries(metricsArr.map(m => [m.id, m.value]))
      const currentCount = metricsMap['active_subscriptions'] ?? metricsMap['active_subscribers'] ?? 0
      // Fill days from first known subscriber date onward
      const RC_SUBSCRIBER_START = '2026-05-26' // date first App Store subscriber joined
      if (currentCount > 0) {
        for (const day of days) rcHistory[day] = day >= RC_SUBSCRIBER_START ? currentCount : 0
      }
    }
  } catch (e) { console.error('RC history error:', e.message) }

  return {
    history: days.map(date => ({
      date,
      stripe:   stripeHistory[date],
      appStore: rcHistory[date],
      total:    stripeHistory[date] + rcHistory[date],
    })),
  }
}

// ── RevenueCat ────────────────────────────────────────────────────
async function fetchRevenueCat() {
  const key = process.env.REVENUECAT_API_KEY
  if (!key) return { error: 'No RevenueCat secret key configured — see dashboard notes' }

  try {
    const headers = {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    }

    // Use hardcoded project ID (visible in RevenueCat dashboard) or env override
    const projectId = process.env.REVENUECAT_PROJECT_ID || 'proj54ac425e'

    // Get overview metrics
    const overviewRes = await fetch(
      `https://api.revenuecat.com/v2/projects/${projectId}/metrics/overview`,
      { headers }
    )
    const overview = await overviewRes.json()

    // Handle both array response and object-with-metrics response
    const metricsArr = Array.isArray(overview)
      ? overview
      : (overview.metrics || overview.data || [])

    const metricsMap = {}
    for (const m of metricsArr) {
      metricsMap[m.id] = m.value
    }

    const activeSubscriptions =
      metricsMap['active_subscriptions'] ??
      metricsMap['active_subscribers']   ??
      null

    const mrr =
      metricsMap['mrr']                       ??
      metricsMap['monthly_recurring_revenue'] ??
      metricsMap['mrr_usd']                   ??
      null

    return {
      projectId,
      activeSubscriptions,
      mrr,
      revenue:    metricsMap['revenue'] ?? metricsMap['revenue_usd'] ?? null,
      metrics:    metricsArr,
    }
  } catch (err) {
    return { error: err.message }
  }
}
