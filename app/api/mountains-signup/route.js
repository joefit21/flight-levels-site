export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return Response.json({ error: 'Email required' }, { status: 400 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY

    const res = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        unsubscribed: false
      })
    })

    if (!res.ok) {
      const error = await res.text()
      console.error('Resend audience error:', error)
      return Response.json({ error: 'Failed to subscribe' }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Mountain signup error:', error)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
