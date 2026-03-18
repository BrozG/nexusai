'use client'

import React, { useState } from 'react'

interface JsonPanelProps {
  lastResponse: string
  domain: string
  latency: number
  adapterName: string
}

const adapters = [
  { name: 'ecom-lora-v2', domain: 'ecommerce' },
  { name: 'tel-lora-v1', domain: 'telecom' },
  { name: 'edu-lora-v1', domain: 'education' },
  { name: 'bank-lora-v1', domain: 'banking' },
]

export default function JsonPanel({ lastResponse = '', domain, latency, adapterName }: JsonPanelProps) {
  const [copied, setCopied] = useState(false)

  const jsonObj = {
    api_key: 'biz_001',
    domain,
    response: lastResponse,
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonObj, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const estimatedTokens = Math.max(12, Math.ceil(lastResponse.length / 4))

  return (
    <div
      style={{
        width: '240px',
        flexShrink: 0,
        background: '#111118',
        borderLeft: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Panel Header */}
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          RESPONSE
        </span>
        <button
          onClick={handleCopy}
          style={{
            background: '#18181f',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '6px',
            padding: '3px 8px',
            fontFamily: 'DM Mono, monospace',
            fontSize: '9px',
            color: copied ? '#34d399' : 'rgba(255,255,255,0.4)',
            cursor: 'pointer',
            transition: 'color 0.2s',
          }}
        >
          {copied ? 'COPIED!' : 'COPY'}
        </button>
      </div>

      {/* JSON Display */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '14px',
          fontFamily: 'DM Mono, monospace',
          fontSize: '11px',
          lineHeight: 1.8,
        }}
      >
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>{'{'}</span>
        <br />
        <span>
          {'  '}<span style={{ color: '#a78bfa' }}>&quot;api_key&quot;</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>: </span>
          <span style={{ color: '#34d399' }}>&quot;biz_001&quot;</span>
        </span>
        <br />
        <span>
          {'  '}<span style={{ color: '#a78bfa' }}>&quot;domain&quot;</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>: </span>
          <span style={{ color: '#34d399' }}>&quot;{domain}&quot;</span>
        </span>
        <br />
        <span>
          {'  '}<span style={{ color: '#a78bfa' }}>&quot;response&quot;</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>: </span>
          <span style={{ color: '#34d399' }}>&quot;{lastResponse}&quot;</span>
        </span>
        <br />
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>{'}'}</span>
      </div>

      {/* Stats Section */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '12px 16px' }}>
        <div
          style={{
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '8px',
          }}
        >
          STATS
        </div>
        {[
          { label: 'latency', value: `${latency}ms`, highlight: true },
          { label: 'tokens', value: `~${estimatedTokens}`, highlight: false },
          { label: 'adapter', value: adapterName, highlight: false },
          { label: 'base model', value: 'phi-2', highlight: false },
        ].map(stat => (
          <div
            key={stat.label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '4px',
            }}
          >
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
              {stat.label}
            </span>
            <span
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '11px',
                color: stat.highlight ? '#34d399' : 'rgba(255,255,255,0.6)',
                fontWeight: stat.highlight ? 600 : 400,
              }}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Adapter Status */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '12px 16px' }}>
        <div
          style={{
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '8px',
          }}
        >
          ADAPTERS
        </div>
        {adapters.map(adapter => {
          const isActive = adapter.domain === domain
          return (
            <div
              key={adapter.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '4px',
              }}
            >
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                {adapter.name}
              </span>
              <span
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '11px',
                  color: isActive ? '#34d399' : 'rgba(255,255,255,0.3)',
                }}
              >
                {isActive ? '● loaded' : '○ idle'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
