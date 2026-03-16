'use client'

import React, { useEffect, useState } from 'react'
import TopBar from '@/components/TopBar'
import Sidebar from '@/components/Sidebar'
import ChatWindow from '@/components/ChatWindow'
import JsonPanel from '@/components/JsonPanel'

const domainMap: Record<string, { color: string; tag: string; adapter: string; short: string }> = {
  ecommerce: { color: '#7c6aff', tag: 'ECOM', adapter: 'ecom-lora-v2', short: 'ecom-v2' },
  telecom: { color: '#22d3ee', tag: 'TEL', adapter: 'tel-lora-v1', short: 'tel-v1' },
  education: { color: '#34d399', tag: 'EDU', adapter: 'edu-lora-v1', short: 'edu-v1' },
  banking: { color: '#fbbf24', tag: 'BANK', adapter: 'bank-lora-v1', short: 'bank-v1' },
}

export default function Dashboard() {
  const [activeDomain, setActiveDomain] = useState('ecommerce')
  const [lastResponse, setLastResponse] = useState('Awaiting first message...')
  const [latency, setLatency] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
  }, [])

  const current = domainMap[activeDomain] || domainMap['ecommerce']

  return (
    <main
      id="dashboard"
      style={{
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.5s ease',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#0a0a0f',
        overflow: 'hidden',
      }}
    >
      <TopBar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar activeDomain={activeDomain} onDomainChange={setActiveDomain} />
        <ChatWindow
          activeDomain={activeDomain}
          domainColor={current.color}
          adapterTag={current.tag}
          onNewResponse={({ response, latency: lat }) => {
            setLastResponse(response)
            setLatency(lat)
          }}
        />
        <JsonPanel
          lastResponse={lastResponse}
          domain={activeDomain}
          latency={latency}
          adapterName={current.short}
        />
      </div>
    </main>
  )
}
