// Private admin dashboard API — never exposed to the public
// All data is fetched server-side; keys never reach the browser

export async function GET(req) {
  // Password check
  const auth = req.headers.get('x-admin-password')
  if (auth !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [stripe, revenuecat, anthropic] = await Promise.all([
    fetchStripe(),
    fetchRevenueCat(),
    fetchAnthropicUsage(),
  ])

  return Response.json({ stripe, revenuecat, anthropic, fetchedAt: new Date().toISOString() })
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
      'https://api.stripe.com/v1/subscriptions?status=active&limit=100&expand[]=data.items.data.price.product',
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
      metricIds:  Object.keys(metricsMap),
      rawDebug:   JSON.stringify(overview).slice(0, 600), // temp debug
      metrics:    metricsArr,
    }
  } catch (err) {
    return { error: err.message }
  }
}
