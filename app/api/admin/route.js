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
    const res  = await fetch(
      'https://api.stripe.com/v1/subscriptions?limit=100&status=all&expand%5B%5D=data.customer',
      { headers }
    )
    const data = await res.json()

    const isActive = (s, dayStart, dayEnd) => {
      if (s.created >= dayEnd) return false
      if (s.cancel_at_period_end || s.cancel_at) return false  // scheduled to cancel — don't count
      if (['active', 'past_due', 'trialing'].includes(s.status)) return true
      if (s.status === 'canceled') return s.canceled_at && s.canceled_at > dayStart
      return false
    }

    for (const day of days) {
      const dayStart = new Date(day).getTime() / 1000
      const dayEnd   = dayStart + 86400
      stripeHistory[day] = (data.data || []).filter(s => isActive(s, dayStart, dayEnd)).length
    }

    // Store today's active subscriber emails for the dashboard
    const todayStart = new Date(days[days.length - 1]).getTime() / 1000
    const todayEnd   = todayStart + 86400
    stripeHistory.__emails = (data.data || [])
      .filter(s => isActive(s, todayStart, todayEnd))
      .map(s => (typeof s.customer === 'object' ? s.customer?.email : null))
      .filter(Boolean)
  } catch (e) { console.error('Stripe history error:', e.message) }

  // ── RevenueCat daily counts ──────────────────────────────────────
  // Strategy: fetch today's live count from RC overview, store it as a dated
  // snapshot in Supabase, then read all stored snapshots for the chart.
  // This builds an accurate history going forward, one day at a time.
  const rcHistory = Object.fromEntries(days.map(d => [d, 0]))
  try {
    const rcHeaders = { Authorization: `Bearer ${rcKey}`, 'Content-Type': 'application/json' }
    const sbUrl     = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
    const sbKey     = process.env.SUPABASE_SERVICE_ROLE_KEY
    const today     = new Date().toISOString().slice(0, 10)

    // 1. Fetch today's active subscriber count from RC
    const overviewRes = await fetch(
      `https://api.revenuecat.com/v2/projects/${projectId}/metrics/overview`,
      { headers: rcHeaders }
    )
    const overview   = await overviewRes.json()
    const metricsArr = Array.isArray(overview) ? overview : (overview.metrics || overview.data || [])
    const metricsMap = Object.fromEntries(metricsArr.map(m => [m.id, m.value]))
    const todayCount = metricsMap['active_subscriptions'] ?? metricsMap['active_subscribers'] ?? 0

    // 2. Upsert today's count into Supabase snapshot table
    if (sbUrl && sbKey && todayCount >= 0) {
      await fetch(`${sbUrl}/rest/v1/rc_subscriber_snapshots`, {
        method: 'POST',
        headers: {
          apikey: sbKey,
          Authorization: `Bearer ${sbKey}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates',
        },
        body: JSON.stringify({ date: today, count: todayCount }),
      })
    }

    // 3. Read all snapshots within our 42-day window
    if (sbUrl && sbKey) {
      const snapshotRes = await fetch(
        `${sbUrl}/rest/v1/rc_subscriber_snapshots?date=gte.${days[0]}&date=lte.${today}&select=date,count`,
        { headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}` } }
      )
      const snapshots = await snapshotRes.json()
      for (const row of (Array.isArray(snapshots) ? snapshots : [])) {
        if (rcHistory[row.date] !== undefined) rcHistory[row.date] = row.count
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
    activeEmails: stripeHistory.__emails || [],
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
