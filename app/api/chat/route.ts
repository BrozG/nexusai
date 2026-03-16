import { NextRequest, NextResponse } from 'next/server'

const mockResponses: Record<string, string[]> = {
  ecommerce: [
    "Refunds take 7–10 business days. Please share your order ID to escalate.",
    "Your return has been logged. Expect a confirmation email within 24 hours.",
    "I can help track your package. Please provide your order number.",
  ],
  telecom: [
    "Please restart your router by holding the power button 10s, then wait 2 min.",
    "Your plan includes 50GB data. Current usage: 32GB. Resets end of month.",
    "Signal issues in your area? Check our outage map at support.telecom.com.",
  ],
  education: [
    "Your course enrollment is confirmed. Access materials via the Student Portal.",
    "Assignment deadlines can be extended — submit a request to your professor.",
    "The library is open Mon–Fri 8am–10pm and weekends 10am–6pm.",
  ],
  banking: [
    "Please verify your identity via the mobile app before we proceed.",
    "Transaction disputes must be filed within 60 days of the statement date.",
    "Your account inquiry has been logged. Please visit a branch with valid ID.",
  ],
}

export async function POST(req: NextRequest) {
  const { api_key, domain } = await req.json()

  if (!api_key) {
    return NextResponse.json({ error: 'Missing API key' }, { status: 401 })
  }

  const responses = mockResponses[domain] || mockResponses['ecommerce']
  const response = responses[Math.floor(Math.random() * responses.length)]

  await new Promise(r => setTimeout(r, 800 + Math.random() * 600))

  return NextResponse.json({ response })
}
