'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return

    gsap.to(imageRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })

    gsap.from(contentRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5
    })
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-dark/40" />
      </div>

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center text-primary px-6"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="font-sans uppercase text-sm mb-6 tracking-[0.4em]"
        >
          Save The Date
        </motion.p>

        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 leading-tight drop-shadow-2xl">
          Rifki <span className="italic text-gold">&</span> Jeni
        </h1>

        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-12 bg-gold/50" />
          <p className="font-sans text-xl tracking-widest font-light">
            11 . 07 . 2026
          </p>
          <div className="h-px w-12 bg-gold/50" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary opacity-60">Scroll to Explore</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-5 h-5 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  )
}
