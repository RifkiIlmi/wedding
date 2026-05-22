'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 glass rounded-xl flex items-center justify-center mb-3 border border-gold/20 shadow-xl">
      <motion.span 
        key={value}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold"
      >
        {value.toString().padStart(2, '0')}
      </motion.span>
    </div>
    <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-dark/60">{label}</span>
  </div>
)

export const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = new Date(targetDate).getTime() - now

      if (distance < 0) {
        clearInterval(timer)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <section className="py-20 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none pattern-dots" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
           <h2 className="font-serif text-3xl text-dark mb-4 italic tracking-wide">The Countdown</h2>
        </div>

        <div className="flex justify-center gap-2 sm:gap-4 md:gap-8 max-w-2xl mx-auto">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  )
}
