'use client'

import { useEffect, useRef } from 'react'

interface FloatingParticlesProps {
  count?: number
  color?: string
  speed?: number
  maxSize?: number
  minSize?: number
  opacity?: number
  className?: string
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  targetOpacity: number
  life: number
  maxLife: number
}

export const FloatingParticles = ({
  count = 40,
  color = '#D4AF37',
  speed = 0.3,
  maxSize = 3,
  minSize = 1,
  opacity = 0.6,
  className = '',
}: FloatingParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.offsetWidth
        canvas.height = parent.offsetHeight
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles
    const createParticle = (): Particle => {
      const maxLife = 200 + Math.random() * 300
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: minSize + Math.random() * (maxSize - minSize),
        speedX: (Math.random() - 0.5) * speed * 0.5,
        speedY: -(Math.random() * speed + speed * 0.2),
        opacity: 0,
        targetOpacity: (Math.random() * 0.5 + 0.5) * opacity,
        life: 0,
        maxLife,
      }
    }

    particlesRef.current = Array.from({ length: count }, createParticle)

    // Distribute particles across different life stages initially
    particlesRef.current.forEach((p, i) => {
      p.life = Math.random() * p.maxLife
      p.y = Math.random() * canvas.height
    })

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((p) => {
        p.life++
        p.x += p.speedX
        p.y += p.speedY

        // Fade in at start, fade out at end
        const lifeRatio = p.life / p.maxLife
        if (lifeRatio < 0.1) {
          p.opacity = p.targetOpacity * (lifeRatio / 0.1)
        } else if (lifeRatio > 0.8) {
          p.opacity = p.targetOpacity * ((1 - lifeRatio) / 0.2)
        } else {
          p.opacity = p.targetOpacity
        }

        // Reset particle when life ends or goes off-screen
        if (p.life >= p.maxLife || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          Object.assign(p, createParticle())
          p.y = canvas.height + 10
        }

        // Draw particle with glow
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.shadowBlur = p.size * 3
        ctx.shadowColor = color
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [count, color, speed, maxSize, minSize, opacity])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-[1] ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
