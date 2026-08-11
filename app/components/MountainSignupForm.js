'use client'
import { useState } from 'react'
import { trackEvent } from '../lib/analytics'

export default function MountainSignupForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/mountains-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
        trackEvent('mountains_signup')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-green-600 font-medium">
        You&rsquo;re on the list. I&rsquo;ll email you when new airport guides go up.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-[#1d4ed8] hover:bg-[#1e40af] disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap"
        >
          {status === 'sending' ? 'Adding...' : 'Notify Me'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-red-500 text-sm">
          Something went wrong. Try again, or email joe@flight-levels.com directly.
        </p>
      )}
    </form>
  )
}
