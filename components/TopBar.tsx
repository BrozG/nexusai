'use client'

import React from 'react'

export default function TopBar() {
  return (
    <div style={{ flexShrink: 0 }}>
      <div
        style={{
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          background: '#111118',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* LEFT — Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              background: 'linear-gradient(135deg, #7c6aff, #c084fc)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '13px',
              fontWeight: 800,
            }}
          >
            Λ
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: '#f0eeff' }}>
            NexusAI
            <span style={{ color: '#a78bfa', fontWeight: 400 }}> Support</span>
          </span>
        </div>

        {/* CENTER — API key chip */}
        <div
          style={{
            background: '#18181f',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '8px',
            padding: '6px 12px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '10px',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            API KEY
          </span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#a78bfa' }}>
            biz_•••••_001
          </span>
        </div>

        {/* RIGHT — Status pill */}
        <div
          style={{
            background: 'rgba(52,211,153,0.08)',
            border: '1px solid rgba(52,211,153,0.2)',
            borderRadius: '20px',
            padding: '4px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <div
            className="animate-pulse-dot"
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#34d399',
            }}
          />
          <span style={{ color: '#34d399', fontSize: '11px', fontWeight: 600, fontFamily: 'Syne, sans-serif' }}>
            Model Ready
          </span>
        </div>
      </div>
      {/* Gradient line */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #7c6aff, transparent)',
          opacity: 0.4,
        }}
      />
    </div>
  )
}
