'use client'

import React from 'react'

interface SidebarProps {
  activeDomain: string
  onDomainChange: (domain: string) => void
}

const domains = [
  { id: 'ecommerce', name: 'E-commerce', emoji: '🛍️', adapter: 'ecom-lora-v2', color: '#7c6aff' },
  { id: 'telecom', name: 'Telecom', emoji: '📡', adapter: 'tel-lora-v1', color: '#22d3ee' },
  { id: 'education', name: 'Education', emoji: '🎓', adapter: 'edu-lora-v1', color: '#34d399' },
  { id: 'banking', name: 'Banking', emoji: '🏦', adapter: 'bank-lora-v1', color: '#fbbf24' },
]

export default function Sidebar({ activeDomain, onDomainChange }: SidebarProps) {
  const activeAdapter = domains.find(d => d.id === activeDomain)?.adapter || 'ecom-lora-v2'

  return (
    <div
      style={{
        width: '200px',
        flexShrink: 0,
        background: '#111118',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        padding: '16px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      {/* Section label */}
      <div
        style={{
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
          padding: '0 12px',
          marginBottom: '4px',
        }}
      >
        DOMAINS
      </div>

      {/* Domain buttons */}
      {domains.map(domain => {
        const isActive = activeDomain === domain.id
        return (
          <button
            key={domain.id}
            onClick={() => onDomainChange(domain.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '10px',
              border: isActive
                ? `1px solid ${domain.color}40`
                : '1px solid transparent',
              background: isActive
                ? `${domain.color}1A`
                : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s',
              width: '100%',
              textAlign: 'left',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.background = '#18181f'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'transparent'
              }
            }}
          >
            {/* Icon box */}
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: `${domain.color}26`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                flexShrink: 0,
              }}
            >
              {domain.emoji}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', color: '#f0eeff' }}>
                {domain.name}
              </div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>
                {domain.adapter}
              </div>
            </div>

            {/* Active dot */}
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: domain.color,
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.2s',
                flexShrink: 0,
              }}
            />
          </button>
        )
      })}

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '8px 0' }} />

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Footer card */}
      <div
        style={{
          background: '#18181f',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '10px',
          padding: '8px 10px',
        }}
      >
        <div
          style={{
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '4px',
          }}
        >
          ACTIVE ADAPTER
        </div>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#a78bfa' }}>
          {activeAdapter}
        </div>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
          Phi-2 · 2.7B · LoRA
        </div>
      </div>
    </div>
  )
}
