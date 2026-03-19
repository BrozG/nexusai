import React from 'react'
import { Menu, Database } from 'lucide-react'

interface TopBarProps {
  onMenuClick?: () => void
  onJsonToggle?: () => void
}

export default function TopBar({ onMenuClick, onJsonToggle }: TopBarProps) {
  return (
    <div style={{ flexShrink: 0, zIndex: 'var(--z-topbar)', position: 'relative' }}>
      <div
        style={{
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          background: '#111118',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* LEFT — Menu & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            className="only-mobile"
            onClick={onMenuClick}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
              padding: '8px',
              minWidth: '44px',
              minHeight: '44px',
            }}
          >
            <Menu size={20} />
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                background: 'linear-gradient(135deg, #7c6aff, #c084fc)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '11px',
                fontWeight: 800,
              }}
            >
              Λ
            </div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '13px', color: '#f0eeff' }}>
              NexusAI
              <span className="only-desktop" style={{ color: '#a78bfa', fontWeight: 400 }}> Support</span>
            </span>
          </div>
        </div>

        {/* CENTER — API key chip (Hidden on very small mobile) */}
        <div
          style={{
            background: '#18181f',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '8px',
            padding: '4px 8px',
            gap: '6px',
          }}
          className="only-desktop"
        >
          <span
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '9px',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            API
          </span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#a78bfa' }}>
            biz_•••_001
          </span>
        </div>

        {/* RIGHT — Actions & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* JSON TOGGLE for Mobile */}
          <button
            onClick={onJsonToggle}
            style={{
              background: '#18181f',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              padding: '6px',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
              minWidth: '36px',
              minHeight: '36px',
            }}
          >
            <Database size={16} />
          </button>

          <div
            style={{
              background: 'rgba(52,211,153,0.08)',
              border: '1px solid rgba(52,211,153,0.2)',
              borderRadius: '20px',
              padding: '3px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <div
              className="animate-pulse-dot"
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#34d399',
              }}
            />
            <span style={{ color: '#34d399', fontSize: '10px', fontWeight: 600, fontFamily: 'Syne, sans-serif' }}>
              <span className="only-desktop">Model </span>Ready
            </span>
          </div>
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
