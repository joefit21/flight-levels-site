export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const ids = searchParams.get('ids')

  if (!ids) {
    return Response.json({ error: 'ids parameter required' }, { status: 400 })
  }

  try {
    const res = await fetch(
      `https://aviationweather.gov/api/data/metar?ids=${encodeURIComponent(ids)}&format=raw`,
      { next: { revalidate: 300 } }
    )

    if (!res.ok) {
      console.error('aviationweather.gov error:', res.status)
      return Response.json({ error: 'Failed to fetch METAR data' }, { status: 502 })
    }

    const text = await res.text()
    const metars = {}
    text.split('\n').forEach((line) => {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) return
      // Lines look like: "METAR KANK 062035Z AUTO ... $", so the station ID is the 2nd token.
      const stationId = trimmed.split(' ')[1]
      if (stationId) metars[stationId] = trimmed
    })

    return Response.json({ metars, fetchedAt: new Date().toISOString() })
  } catch (error) {
    console.error('METAR proxy error:', error)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
