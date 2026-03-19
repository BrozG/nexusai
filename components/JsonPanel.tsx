import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface JsonPanelProps {
  lastResponse: string
  domain: string
  latency: number
  adapterName: string
  isOpen?: boolean
  onClose?: () => void
}

const adapters = [
  { name: 'ecom-lora-v2', domain: 'ecommerce' },
  { name: 'tel-lora-v1', domain: 'telecom' },
  { name: 'edu-lora-v1', domain: 'education' },
  { name: 'bank-lora-v1', domain: 'banking' },
]

export default function JsonPanel({ lastResponse = '', domain, latency, adapterName, isOpen, onClose }: JsonPanelProps) {
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
        className={isOpen ? 'panel-open' : 'panel-closed'}
        style={{
          width: '260px',
          flexShrink: 0,
          background: '#111118',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, width 0.3s ease',
          zIndex: 'var(--z-drawer)',
          position: 'relative',
        }}
      >
        {/* Panel Header */}
        <div
          style={{
            padding: '1rem',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button 
              className="only-mobile"
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '32px',
                minHeight: '32px',
              }}
            >
              <X size={16} />
            </button>
            <span
              style={{
                fontSize: '0.625rem',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              RESPONSE
            </span>
          </div>
          <button
            onClick={handleCopy}
            style={{
              background: '#18181f',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '0.375rem',
              padding: '0.25rem 0.5rem',
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.5625rem',
              color: copied ? '#34d399' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'color 0.2s',
              minWidth: '44px',
              minHeight: '24px',
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
            padding: '1rem',
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.6875rem',
            lineHeight: 1.8,
            wordBreak: 'break-all',
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
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '0.75rem 1rem' }}>
          <div
            style={{
              fontSize: '0.5625rem',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '0.5rem',
            }}
          >
            STATS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
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
                  alignItems: 'center',
                }}
              >
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6875rem', color: 'rgba(255,255,255,0.4)' }}>
                  {stat.label}
                </span>
                <span
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.6875rem',
                    color: stat.highlight ? '#34d399' : 'rgba(255,255,255,0.6)',
                    fontWeight: stat.highlight ? 600 : 400,
                  }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Adapter Status */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '0.75rem 1rem' }}>
          <div
            style={{
              fontSize: '0.5625rem',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '0.5rem',
            }}
          >
            ADAPTERS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {adapters.map(adapter => {
              const isActive = adapter.domain === domain
              return (
                <div
                  key={adapter.name}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6875rem', color: 'rgba(255,255,255,0.5)' }}>
                    {adapter.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.6875rem',
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
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1023px) {
          .panel-closed { 
            transform: translateX(100%); 
            position: fixed !important; 
            top: 0; bottom: 0; right: 0; 
            box-shadow: none;
            width: 260px;
          }
          .panel-open { 
            transform: translateX(0); 
            position: fixed !important; 
            top: 0; bottom: 0; right: 0; 
            box-shadow: -20px 0 50px rgba(0,0,0,0.5);
            width: 260px;
          }
        }
        @media (min-width: 1024px) {
          .panel-closed, .panel-open { 
            transform: none !important; 
            position: relative !important;
            box-shadow: none !important;
            display: flex !important;
          }
        }
      `}} />
    </>
  )
}
