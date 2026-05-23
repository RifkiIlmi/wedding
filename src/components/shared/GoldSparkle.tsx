'use client'

import { motion } from 'framer-motion'

interface GoldSparkleProps {
  size?: number
  delay?: number
  className?: string
}

export const GoldSparkle = ({ size = 16, delay = 0, className = '' }: GoldSparkleProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`inline-block ${className}`}
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [0, 1, 0.8, 1, 0],
      opacity: [0, 1, 0.8, 1, 0],
      rotate: [0, 15, -10, 5, 0],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      repeatDelay: 1 + Math.random() * 2,
      ease: 'easeInOut',
    }}
  >
    <path
      d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z"
      fill="url(#goldGradient)"
    />
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4AF37" />
        <stop offset="50%" stopColor="#F1E5AC" />
        <stop offset="100%" stopColor="#D4AF37" />
      </linearGradient>
    </defs>
  </motion.svg>
)

export const SparkleGroup = ({ className = '' }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <GoldSparkle size={12} delay={0} className="absolute -top-2 -left-1" />
    <GoldSparkle size={8} delay={0.8} className="absolute top-3 left-6" />
    <GoldSparkle size={14} delay={1.5} className="absolute -top-4 left-12" />
    <GoldSparkle size={6} delay={2.2} className="absolute top-1 left-20" />
  </div>
)
