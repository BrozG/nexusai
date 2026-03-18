import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { api_key, domain, query } = await req.json()

  if (!api_key) {
    return NextResponse.json(
      { error: 'Missing API key' }, 
      { status: 401 }
    )
  }

  if (!query || !domain) {
    return NextResponse.json(
      { error: 'Missing query or domain' }, 
      { status: 400 }
    )
  }

  try {
    const res = await fetch(`${process.env.FASTAPI_URL}/api/chat`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'  // ← important for ngrok
      },
      body: JSON.stringify({ api_key, domain, query })
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Model server error' }, 
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json({ response: data.response })

  } catch (error) {
    return NextResponse.json(
      { error: 'Cannot reach model server. Is Colab running?' }, 
      { status: 503 }
    )
  }
}