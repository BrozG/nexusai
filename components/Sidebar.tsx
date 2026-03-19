import React, { useEffect } from 'react'
import { X } from 'lucide-react'

interface SidebarProps {
  activeDomain: string
  onDomainChange: (domain: string) => void
  isOpen?: boolean
  onClose?: () => void
}

const domains = [
  { id: 'ecommerce', name: 'E-commerce', emoji: '🛍️', adapter: 'ecom-lora-v2', color: '#7c6aff' },
  { id: 'telecom', name: 'Telecom', emoji: '📡', adapter: 'tel-lora-v1', color: '#22d3ee' },
  { id: 'education', name: 'Education', emoji: '🎓', adapter: 'edu-lora-v1', color: '#34d399' },
  { id: 'banking', name: 'Banking', emoji: '🏦', adapter: 'bank-lora-v1', color: '#fbbf24' },
]

export default function Sidebar({ activeDomain, onDomainChange, isOpen, onClose }: SidebarProps) {
  const activeAdapter = domains.find(d => d.id === activeDomain)?.adapter || 'ecom-lora-v2'

  // Lock body scroll when drawer is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* OVERLAY (Mobile only) */}
      {isOpen && (
        <div 
          className="only-mobile"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(2px)',
            zIndex: 'var(--z-overlay)',
          }}
          onClick={onClose}
        />
      )}

      <div
        className={isOpen ? 'sidebar-open' : 'sidebar-closed'}
        style={{
          width: '240px',
          flexShrink: 0,
          background: '#111118',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          transition: 'transform 0.3s ease, width 0.3s ease',
          position: 'relative',
          zIndex: 'var(--z-drawer)',
        }}
      >
        {/* Mobile Header with Close Button */}
        <div 
          className="only-mobile"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            padding: '0 4px',
          }}
        >
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: '#f0eeff' }}>
            Menu
          </span>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              padding: '4px',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {domains.map(domain => {
            const isActive = activeDomain === domain.id
            return (
              <button
                key={domain.id}
                onClick={() => onDomainChange(domain.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
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
                  minHeight: '48px', // Touch target
                }}
              >
                {/* Icon box */}
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: `${domain.color}26`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    flexShrink: 0,
                  }}
                >
                  {domain.emoji}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '13px', color: '#f0eeff' }}>
                    {domain.name}
                  </div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>
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
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '16px 0' }} />

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Footer card */}
        <div
          style={{
            background: '#18181f',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '10px',
            padding: '12px',
          }}
        >
          <div
            style={{
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '6px',
            }}
          >
            ACTIVE ADAPTER
          </div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#a78bfa', fontWeight: 600 }}>
            {activeAdapter}
          </div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
            Phi-2 · 2.7B · LoRA
          </div>
        </div>
      </div>
      
      {/* Inline styles for media query */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 767px) {
          .sidebar-closed { 
            transform: translateX(-100%); 
            position: fixed !important; 
            top: 0; bottom: 0; left: 0; 
            box-shadow: none;
          }
          .sidebar-open { 
            transform: translateX(0); 
            position: fixed !important; 
            top: 0; bottom: 0; left: 0; 
            box-shadow: 20px 0 50px rgba(0,0,0,0.5);
          }
        }
        @media (min-width: 768px) {
          .sidebar-closed, .sidebar-open { 
            transform: none !important; 
            position: relative !important;
            box-shadow: none !important;
          }
        }
      `}} />
    </>
  )
}
