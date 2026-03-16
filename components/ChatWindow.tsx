'use client'

import React, { useState, useRef, useEffect } from 'react'

interface ChatWindowProps {
  activeDomain: string
  domainColor: string
  adapterTag: string
  onNewResponse: (data: { response: string; latency: number; domain: string }) => void
}

interface Message {
  id: number
  role: 'user' | 'ai'
  text: string
  tag?: string
}

const domainNames: Record<string, string> = {
  ecommerce: 'E-commerce',
  telecom: 'Telecom',
  education: 'Education',
  banking: 'Banking',
}

const fallbacks: Record<string, string> = {
  ecommerce: 'Refunds take 7–10 business days. Please share your order ID.',
  telecom: 'Restart your router and wait 2 minutes. Still facing issues?',
  education: 'Your enrollment is confirmed. Access materials via Student Portal.',
  banking: 'Please verify your identity via the mobile app before proceeding.',
}

const domainGreetings: Record<string, string> = {
  ecommerce: "Hello! I'm your E-commerce support assistant powered by ecom-lora-v2. How can I help you today?",
  telecom: "Hello! I'm your Telecom support assistant powered by tel-lora-v1. How can I help you today?",
  education: "Hello! I'm your Education support assistant powered by edu-lora-v1. How can I help you today?",
  banking: "Hello! I'm your Banking support assistant powered by bank-lora-v1. How can I help you today?",
}

export default function ChatWindow({ activeDomain, domainColor, adapterTag, onNewResponse }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)
  const [mounted, setMounted] = useState(false)

  // Initialize messages strictly on the client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Reset messages when domain changes, only after mounted
  useEffect(() => {
    if (!mounted) return
    setMessages([
      { id: nextId.current++, role: 'ai', text: domainGreetings[activeDomain] || domainGreetings['ecommerce'], tag: adapterTag },
    ])
  }, [activeDomain, adapterTag, mounted])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text) return
    setInput('')

    const userMsg: Message = { id: nextId.current++, role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    const start = Date.now()

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: 'biz_001', domain: activeDomain, query: text }),
      })
      const data = await res.json()
      const latency = Date.now() - start

      setIsTyping(false)
      const aiMsg: Message = { id: nextId.current++, role: 'ai', text: data.response, tag: adapterTag }
      setMessages(prev => [...prev, aiMsg])
      onNewResponse({ response: data.response, latency, domain: activeDomain })
    } catch {
      const latency = Date.now() - start
      setIsTyping(false)
      const fallbackText = fallbacks[activeDomain] || fallbacks['ecommerce']
      const aiMsg: Message = { id: nextId.current++, role: 'ai', text: fallbackText, tag: adapterTag }
      setMessages(prev => [...prev, aiMsg])
      onNewResponse({ response: fallbackText, latency, domain: activeDomain })
    }
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Chat Header */}
      <div
        style={{
          padding: '14px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.5px',
            padding: '3px 10px',
            borderRadius: '20px',
            background: `${domainColor}1F`,
            color: domainColor,
            border: `1px solid ${domainColor}40`,
          }}
        >
          {domainNames[activeDomain] || 'E-commerce'}
        </span>
        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '13px', color: '#f0eeff' }}>
          Customer Support Chat
        </span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
          POST /api/chat · dynamic adapter routing
        </span>
      </div>

      {/* Messages Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {messages.map(msg => (
          <div
            key={msg.id}
            className="message-enter"
            style={{
              display: 'flex',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              gap: '10px',
              maxWidth: '85%',
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                ...(msg.role === 'ai'
                  ? { background: 'linear-gradient(135deg, #7c6aff, #a78bfa)', color: 'white' }
                  : { background: '#18181f', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.4)' }),
              }}
            >
              {msg.role === 'ai' ? 'Λ' : 'U'}
            </div>

            {/* Content */}
            <div>
              {/* Meta */}
              <div
                style={{
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                {msg.role === 'ai' && msg.tag && (
                  <span
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '9px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      background: `${domainColor}26`,
                      color: domainColor,
                    }}
                  >
                    {msg.tag}
                  </span>
                )}
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>
                  {msg.role === 'ai' ? 'NexusAI · just now' : 'You · just now'}
                </span>
              </div>

              {/* Bubble */}
              <div
                style={{
                  padding: '10px 14px',
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  ...(msg.role === 'ai'
                    ? {
                        background: '#18181f',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '12px',
                        borderTopLeftRadius: '4px',
                        color: '#f0eeff',
                      }
                    : {
                        background: 'linear-gradient(135deg, #7c6aff, #9333ea)',
                        borderRadius: '12px',
                        borderTopRightRadius: '4px',
                        color: 'white',
                      }),
                }}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="message-enter" style={{ display: 'flex', gap: '10px', maxWidth: '85%' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                flexShrink: 0,
                background: 'linear-gradient(135deg, #7c6aff, #a78bfa)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
              }}
            >
              Λ
            </div>
            <div>
              <div style={{ marginBottom: '4px', fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>
                NexusAI · typing...
              </div>
              <div
                style={{
                  background: '#18181f',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '12px',
                  borderTopLeftRadius: '4px',
                  padding: '14px 18px',
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center',
                }}
              >
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div
        style={{
          padding: '14px 20px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          background: '#111118',
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-end',
        }}
      >
        <div
          style={{
            flex: 1,
            background: '#18181f',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '12px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = 'rgba(124,106,255,0.5)'
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,106,255,0.08)'
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') sendMessage() }}
            placeholder="Type your message..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'DM Mono, monospace',
              fontSize: '13px',
              color: '#f0eeff',
            }}
          />
        </div>

        {/* Send button */}
        <button
          onClick={sendMessage}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            flexShrink: 0,
            background: 'linear-gradient(135deg, #7c6aff, #9333ea)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.2s, transform 0.1s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.95)' }}
          onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  )
}
