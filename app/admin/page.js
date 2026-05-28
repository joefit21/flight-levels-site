'use client'
import { useState, useEffect } from 'react'

const FIXED_EXPENSES = [
  { name: 'Apple Developer Program', amount: 8.25,  note: '$99/year' },
  { name: 'Claude Pro (claude.ai)',  amount: 20,    note: 'AI coding assistant' },
  { name: 'Vercel',                  amount: 0,     note: 'Free tier' },
  { name: 'Supabase',                amount: 0,     note: 'Free tier' },
  { name: 'RevenueCat',              amount: 0,     note: 'Free under $2,500 MRR' },
  { name: 'Domain Registration',     amount: 0,     note: 'Annual — enter monthly equiv.' },
]

// Net rates after platform fees
const APPLE_NET_RATE  = 0.85 * 0.99  // Apple 15% + RevCat 1%
const STRIPE_NET_RATE = rate => rate * 0.971 - 0.30  // Stripe 2.9% + $0.30

function fmt(n) {
  if (n === undefined || n === null) return '—'
  return '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function fmtInt(n) {
  return '$' + Math.round(n || 0).toLocaleString('en-US')
}

function StatCard({ label, value, sub, color = 'blue' }) {
  const colors = { blue: 'text-blue-600', green: 'text-green-600', red: 'text-red-600', purple: 'text-purple-600' }
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">{label}</div>
      <div className={`text-3xl font-bold ${colors[color]}`}>{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  )
}

export default function AdminDashboard() {
  const [password, setPassword]         = useState('')
  const [authed, setAuthed]             = useState(false)
  const [authError, setAuthError]       = useState('')
  const [loading, setLoading]           = useState(false)
  const [data, setData]                 = useState(null)
  const [error, setError]               = useState(null)
  const [anthropicCost, setAnthropicCost] = useState('')
  const [extraExpenses, setExtraExpenses] = useState([])
  const [newName, setNewName]           = useState('')
  const [newAmt, setNewAmt]             = useState('')
  const [rcSubs, setRcSubs]             = useState({ cp_apple: '', atc_apple: '', bundle_apple: '' })

  // Restore saved password
  useEffect(() => {
    const saved = sessionStorage.getItem('fl_admin_pw')
    if (saved) { setPassword(saved); handleFetch(saved) }
  }, [])

  async function handleFetch(pw) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin', { headers: { 'x-admin-password': pw } })
      if (res.status === 401) { setAuthError('Wrong password'); setLoading(false); return }
      const json = await res.json()
      setData(json)
      setAuthed(true)
      sessionStorage.setItem('fl_admin_pw', pw)
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  function handleLogin(e) {
    e.preventDefault()
    setAuthError('')
    handleFetch(password)
  }

  // ── Calculations ──────────────────────────────────────────────
  const stripe = data?.stripe || {}

  // Apple/RevCat income — auto from RevenueCat MRR if available, else manual
  const rc             = data?.revenuecat || {}
  const rcHasData      = rc.mrr != null && rc.activeSubscriptions != null
  const cpAppleNet     = (parseFloat(rcSubs.cp_apple)     || 0) * 29 * APPLE_NET_RATE
  const atcAppleNet    = (parseFloat(rcSubs.atc_apple)    || 0) * 29 * APPLE_NET_RATE
  const bundleAppleNet = (parseFloat(rcSubs.bundle_apple) || 0) * 49 * APPLE_NET_RATE
  const appleNetManual = cpAppleNet + atcAppleNet + bundleAppleNet
  // RevenueCat MRR is gross; apply same net rate
  const appleNet       = rcHasData ? (rc.mrr * APPLE_NET_RATE) : appleNetManual

  // Stripe income (auto)
  const stripeNet = (stripe.monthlyRevenue
    ? Object.entries(stripe.monthlyRevenue)
        .sort((a, b) => b[0].localeCompare(a[0]))[0]?.[1] || 0
    : 0) * (STRIPE_NET_RATE(29) / 29)
  const currentMonthKey = new Date().toISOString().slice(0, 7)
  const stripeThisMonth = (stripe.monthlyRevenue?.[currentMonthKey] || 0)
  const stripeThisMonthNet = stripeThisMonth * (1 - 0.029) - (stripeThisMonth > 0 ? 0.30 : 0)

  const totalNet = appleNet + stripeThisMonthNet

  // Expenses
  const fixedTotal        = FIXED_EXPENSES.reduce((s, e) => s + e.amount, 0)
  const extraTotal        = extraExpenses.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0)
  const anthropicEstimated = data?.anthropic?.estimatedCost ?? 0
  const anthropic          = parseFloat(anthropicCost) || anthropicEstimated
  const totalExp           = fixedTotal + extraTotal + anthropic

  const netProfit  = totalNet - totalExp

  const now       = new Date()
  const monthName = now.toLocaleString('en-US', { month: 'long', year: 'numeric' })

  // ── Login screen ──────────────────────────────────────────────
  if (!authed) {
    return (
      <main className="min-h-screen bg-[#0a0f1e] flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl">
          <div className="text-2xl font-bold text-[#1e3a5f] mb-1">✈️ Flight Levels</div>
          <div className="text-sm text-gray-400 mb-6">Financial Dashboard · Private</div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          {authError && <p className="text-red-500 text-sm mb-3">{authError}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] disabled:opacity-50 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? 'Loading...' : 'Open Dashboard'}
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-[#1e3a5f] text-white px-8 py-5 flex items-center justify-between">
        <div>
          <div className="text-lg font-bold">✈️ Flight Levels — Financial Dashboard</div>
          <div className="text-sm opacity-60">{monthName} · Last updated: {data?.fetchedAt ? new Date(data.fetchedAt).toLocaleTimeString() : '—'}</div>
        </div>
        <button
          onClick={() => handleFetch(password)}
          disabled={loading}
          className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {loading ? 'Refreshing...' : '↻ Refresh'}
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">{error}</div>}

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard label="Net This Month" value={fmtInt(netProfit)} sub="After all fees & costs" color={netProfit >= 0 ? 'green' : 'red'} />
          <StatCard label="Total Income" value={fmtInt(totalNet)} sub="App Store + Web" color="blue" />
          <StatCard label="Total Expenses" value={fmtInt(totalExp)} sub="Tools & subscriptions" color="red" />
          <StatCard label="Stripe Pending" value={fmt(stripe.pendingBalance)} sub="Arriving in ~2 days" color="purple" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* ── App Store Income ── */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
              📱 App Store Income{' '}
              <span className="text-xs font-normal normal-case text-gray-300">
                {rcHasData ? '(auto-loaded)' : '(enter subscriber counts)'}
              </span>
            </h2>

            {rcHasData ? (
              // Auto mode — RevenueCat has data
              <>
                <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
                  <div>
                    <div className="text-sm font-medium">Active subscribers</div>
                    <div className="text-xs text-gray-400">All products combined</div>
                  </div>
                  <div className="text-sm font-semibold text-blue-600">{rc.activeSubscriptions}</div>
                </div>
                <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
                  <div>
                    <div className="text-sm font-medium">Gross MRR</div>
                    <div className="text-xs text-gray-400">Before Apple & RevenueCat fees</div>
                  </div>
                  <div className="text-sm font-semibold text-blue-600">{fmt(rc.mrr)}</div>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <div>
                    <div className="text-sm font-medium">Net MRR</div>
                    <div className="text-xs text-gray-400">After Apple 15% + RevCat 1%</div>
                  </div>
                  <div className="text-sm font-semibold text-green-600">{fmt(rc.mrr * APPLE_NET_RATE)}</div>
                </div>
              </>
            ) : (
              // Manual fallback
              <>
                {[
                  { id: 'cp_apple',     label: 'Checkride Prep',  price: 29 },
                  { id: 'atc_apple',    label: 'ATC Trainer',     price: 29 },
                  { id: 'bundle_apple', label: 'Bundle',          price: 49 },
                ].map(({ id, label, price }) => (
                  <div key={id} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                    <div>
                      <div className="text-sm font-medium">{label}</div>
                      <div className="text-xs text-gray-400">${price}/mo · ~{fmt(price * APPLE_NET_RATE)} net per sub</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number" min="0"
                        value={rcSubs[id]}
                        onChange={e => setRcSubs(p => ({ ...p, [id]: e.target.value }))}
                        className="w-16 border border-gray-200 rounded-lg px-2 py-1.5 text-center text-sm bg-gray-50 focus:outline-none focus:border-blue-400"
                        placeholder="0"
                      />
                      <div className="text-sm font-semibold text-green-600 w-16 text-right">
                        {fmt((parseFloat(rcSubs[id]) || 0) * price * APPLE_NET_RATE)}
                      </div>
                    </div>
                  </div>
                ))}
                {rc.error && (
                  <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700">
                    ⚠️ RevenueCat: {rc.error}
                  </div>
                )}
              </>
            )}

            {/* Temp debug — shows raw RevenueCat response */}
            {rc.rawDebug && (
              <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-400 break-all">{rc.rawDebug}</div>
            )}
            {rc.error && (
              <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-2 text-xs text-amber-700">⚠️ {rc.error}</div>
            )}

            <div className="flex justify-between items-center pt-3 mt-2 border-t-2 border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">App Store Total</span>
              <span className="text-lg font-bold text-green-600">{fmt(appleNet)}</span>
            </div>
          </div>

          {/* ── Stripe Income (auto) ── */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">💳 Web / Stripe Income <span className="text-xs font-normal normal-case text-gray-300">(auto-loaded)</span></h2>

            <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
              <div>
                <div className="text-sm font-medium">Charges this month</div>
                <div className="text-xs text-gray-400">Gross before Stripe fees</div>
              </div>
              <div className="text-sm font-semibold text-blue-600">{fmt(stripeThisMonth)}</div>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
              <div>
                <div className="text-sm font-medium">Net after Stripe fees</div>
                <div className="text-xs text-gray-400">~2.9% + $0.30 per charge</div>
              </div>
              <div className="text-sm font-semibold text-green-600">{fmt(stripeThisMonthNet)}</div>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
              <div>
                <div className="text-sm font-medium">Pending payout</div>
                <div className="text-xs text-gray-400">Available: {fmt(stripe.availableBalance)}</div>
              </div>
              <div className="text-sm font-semibold text-purple-600">{fmt(stripe.pendingBalance)}</div>
            </div>

            {/* Recent charges */}
            {stripe.recentCharges?.length > 0 && (
              <div className="mt-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Recent Charges</div>
                {stripe.recentCharges.slice(0, 5).map((c, i) => (
                  <div key={i} className="flex justify-between text-xs py-1 text-gray-500">
                    <span>{c.date}</span>
                    <span>{fmt(c.amount)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Recent payouts */}
            {stripe.recentPayouts?.length > 0 && (
              <div className="mt-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Recent Payouts to Bank</div>
                {stripe.recentPayouts.map((p, i) => (
                  <div key={i} className="flex justify-between text-xs py-1 text-gray-500">
                    <span>{p.arrivalDate}</span>
                    <span className={p.status === 'paid' ? 'text-green-600' : 'text-amber-500'}>{fmt(p.amount)} · {p.status}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center pt-3 mt-2 border-t-2 border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Web Total (net)</span>
              <span className="text-lg font-bold text-green-600">{fmt(stripeThisMonthNet)}</span>
            </div>
          </div>

          {/* ── Expenses ── */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">🔧 Monthly Expenses</h2>

            {/* Fixed */}
            {FIXED_EXPENSES.map((exp, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="text-sm font-medium">{exp.name}</div>
                  <div className="text-xs text-gray-400">{exp.note}</div>
                </div>
                <div className="text-sm font-semibold text-red-500">{exp.amount > 0 ? fmt(exp.amount) : <span className="text-gray-300">$0</span>}</div>
              </div>
            ))}

            {/* Anthropic — auto-calculated from Supabase token log */}
            <div className="py-2 border-b border-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Anthropic API</div>
                  {data?.anthropic?.totalCalls != null ? (
                    <div className="text-xs text-gray-400">
                      {data.anthropic.totalCalls} calls · {Math.round(data.anthropic.totalInputTokens / 1000)}K in / {Math.round(data.anthropic.totalOutputTokens / 1000)}K out tokens
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400">Variable · auto-tracking active</div>
                  )}
                </div>
                <div className="text-sm font-semibold text-red-500">
                  {anthropicCost
                    ? fmt(parseFloat(anthropicCost))
                    : data?.anthropic?.estimatedCost != null
                      ? <>{fmt(data.anthropic.estimatedCost)} <span className="text-xs font-normal text-gray-300">est.</span></>
                      : <span className="text-gray-300">$0.00</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs text-gray-300">Actual bill override:</span>
                <span className="text-xs text-gray-400">$</span>
                <input
                  type="number" min="0" step="0.01"
                  value={anthropicCost}
                  onChange={e => setAnthropicCost(e.target.value)}
                  className="w-20 border border-gray-200 rounded-lg px-2 py-1.5 text-right text-xs bg-gray-50 focus:outline-none focus:border-blue-400"
                  placeholder={data?.anthropic?.estimatedCost != null ? data.anthropic.estimatedCost.toFixed(2) : '0.00'}
                />
              </div>
            </div>

            {/* Extra expenses */}
            {extraExpenses.map((exp, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50">
                <div className="text-sm font-medium">{exp.name}</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-red-500">{fmt(parseFloat(exp.amount) || 0)}</span>
                  <button
                    onClick={() => setExtraExpenses(p => p.filter((_, j) => j !== i))}
                    className="text-gray-300 hover:text-red-400 text-lg leading-none"
                  >×</button>
                </div>
              </div>
            ))}

            {/* Add expense */}
            <div className="flex gap-2 mt-3">
              <input
                type="text" placeholder="Expense name"
                value={newName} onChange={e => setNewName(e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-gray-50 focus:outline-none focus:border-blue-400"
              />
              <input
                type="number" placeholder="$/mo" min="0"
                value={newAmt} onChange={e => setNewAmt(e.target.value)}
                className="w-20 border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center bg-gray-50 focus:outline-none focus:border-blue-400"
              />
              <button
                onClick={() => {
                  if (!newName.trim()) return
                  setExtraExpenses(p => [...p, { name: newName.trim(), amount: newAmt }])
                  setNewName(''); setNewAmt('')
                }}
                className="bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-semibold"
              >+ Add</button>
            </div>

            <div className="flex justify-between items-center pt-3 mt-3 border-t-2 border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Expenses</span>
              <span className="text-lg font-bold text-red-500">{fmt(totalExp)}</span>
            </div>
          </div>

        </div>

        {/* Monthly revenue history */}
        {stripe.monthlyRevenue && Object.keys(stripe.monthlyRevenue).length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">📈 Stripe Revenue History</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {Object.entries(stripe.monthlyRevenue)
                .sort((a, b) => b[0].localeCompare(a[0]))
                .slice(0, 6)
                .map(([month, gross]) => (
                  <div key={month} className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-xs text-gray-400 mb-1">{new Date(month + '-01').toLocaleString('en-US', { month: 'short', year: '2-digit' })}</div>
                    <div className="text-base font-bold text-blue-600">{fmtInt(gross)}</div>
                    <div className="text-xs text-gray-300">gross</div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="text-center text-xs text-gray-400 mt-6">
          Private dashboard · Not indexed · Numbers reset on page refresh — use the HTML tracker on your Desktop to save monthly records
        </div>
      </div>
    </main>
  )
}
