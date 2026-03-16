export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json()

    const RESEND_API_KEY = process.env.RESEND_API_KEY

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Flight Levels Contact <contact@flight-levels.com>',
        to: 'joe@flight-levels.com',
        subject: `New message: ${subject || 'General Inquiry'} from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `
      })
    })

    if (!res.ok) {
      const error = await res.text()
      console.error('Resend error:', error)
      return Response.json({ error: 'Failed to send' }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Contact error:', error)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
