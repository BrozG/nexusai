'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import * as THREE from 'three'
import { gsap } from 'gsap'

function Component() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)

  // Three.js nebula setup
  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Nebula particles
    const particleCount = 2000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    const color1 = new THREE.Color(0x7c6aff)
    const color2 = new THREE.Color(0x22d3ee)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const radius = Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi) - 5

      const mixFactor = Math.random()
      const mixedColor = color1.clone().lerp(color2, mixFactor)
      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b

      sizes[i] = Math.random() * 3 + 0.5
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    camera.position.z = 5

    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.001

      particles.rotation.y = time * 0.5
      particles.rotation.x = Math.sin(time * 0.3) * 0.1

      const posArray = geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        posArray[i3 + 1] += Math.sin(time * 2 + i * 0.01) * 0.002
      }
      geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    setTimeout(() => setIsReady(true), 500)

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  // GSAP animations once ready
  useEffect(() => {
    if (!isReady) return

    const tl = gsap.timeline()

    const title = document.querySelector('.hero-title')
    if (title) {
      tl.from(title, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
      })
    }

    const subtitleLines = document.querySelectorAll('.subtitle-line')
    subtitleLines.forEach((line, i) => {
      tl.from(line, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      }, `-=${i === 0 ? 0.4 : 0.3}`)
    })

    const ctaBlock = document.querySelector('.cta-block')
    if (ctaBlock) {
      tl.from(ctaBlock, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.4')
    }

    const verticalText = document.querySelector('.vertical-text')
    if (verticalText) {
      tl.from(verticalText, {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.6')
    }
  }, [isReady])

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return
    const el = scrollContainerRef.current
    const scrollTop = el.scrollTop
    const scrollHeight = el.scrollHeight - el.clientHeight
    const progress = scrollTop / scrollHeight

    const section = Math.min(2, Math.floor(progress * 3))
    setCurrentSection(section)

    if (progress >= 0.98) {
      router.push('/dashboard')
    }
  }, [router])

  const sections = [
    {
      title: 'MULTI-DOMAIN',
      line1: 'One frozen base model. Four domain adapters.',
      line2: 'Zero compromise on accuracy or speed.',
    },
    {
      title: 'SCALABLE',
      line1: 'From startup to enterprise —',
      line2: 'the system grows with you.',
    },
  ]

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      style={{
        height: '100vh',
        overflowY: 'auto',
        background: '#0a0a0f',
        position: 'relative',
      }}
    >
      {/* Fixed canvas background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />

      {/* Vertical side text */}
      <div
        className="vertical-text"
        style={{
          position: 'fixed',
          left: '24px',
          top: '50%',
          transform: 'translateY(-50%) rotate(-90deg)',
          fontFamily: 'DM Mono, monospace',
          fontSize: '10px',
          letterSpacing: '4px',
          color: 'rgba(255,255,255,0.15)',
          zIndex: 10,
          textTransform: 'uppercase',
        }}
      >
        AI
      </div>

      {/* Hero section */}
      <div
        ref={containerRef}
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          className="hero-content"
          style={{
            textAlign: 'center',
            maxWidth: '800px',
            padding: '0 40px',
          }}
        >
          <h1
            className="hero-title"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(48px, 8vw, 96px)',
              letterSpacing: '-2px',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #f0eeff 0%, #7c6aff 50%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '24px',
            }}
          >
            NEXUSAI
          </h1>

          <div className="hero-subtitle" style={{ marginBottom: '0' }}>
            <div
              className="subtitle-line"
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '15px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.8,
              }}
            >
              Scalable customer support,
            </div>
            <div
              className="subtitle-line"
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '15px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.8,
              }}
            >
              powered by LoRA fine-tuned intelligence.
            </div>
          </div>

          {/* CTA block */}
          <div
            className="cta-block"
            style={{
              marginTop: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <button
              onClick={() => router.push('/dashboard')}
              style={{
                background: 'linear-gradient(135deg, #7c6aff, #9333ea)',
                color: 'white',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '15px',
                letterSpacing: '0.5px',
                padding: '14px 32px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.85'
                e.currentTarget.style.transform = 'scale(1.02)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Launch Dashboard →
            </button>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['3000+ Training Samples', 'Phi-2 · 2.7B', '4 Domains'].map(label => (
                <span
                  key={label}
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '11px',
                    color: '#a78bfa',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    padding: '4px 14px',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll sections */}
      {sections.map((section, i) => (
        <div
          key={i}
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
            opacity: currentSection >= i + 1 ? 1 : 0.3,
            transition: 'opacity 0.6s ease',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '700px', padding: '0 40px' }}>
            <h2
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(36px, 5vw, 64px)',
                letterSpacing: '-1px',
                color: '#f0eeff',
                marginBottom: '20px',
              }}
            >
              {section.title}
            </h2>
            <p
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.8,
              }}
            >
              {section.line1}
              <br />
              {section.line2}
            </p>
          </div>
        </div>
      ))}

      {/* Bottom gradient */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '120px',
          background: 'linear-gradient(to top, #0a0a0f, transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Scroll indicator */}
      <div
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: '6px',
        }}
      >
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              width: currentSection === i ? '24px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: currentSection === i ? '#7c6aff' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export { Component as HorizonHero }
