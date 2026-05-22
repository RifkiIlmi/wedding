'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="py-20 bg-dark text-primary border-t border-gold/10">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-8 tracking-tight">Thank You</h2>

          <p className="font-sans text-sm text-primary/60 max-w-xl mx-auto leading-relaxed mb-12 italic">
            "Two souls with but a single thought, two hearts that beat as one."
            <br />
            We look forward to celebrating this special day with you.
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-gold/30" />
              <Heart className="w-5 h-5 text-gold fill-gold/20" />
              <div className="h-px w-8 bg-gold/30" />
            </div>
            <h3 className="font-serif text-3xl text-gold">Rifki & Jeni</h3>
          </div>

          <div className="mt-24 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] uppercase tracking-[0.4em] text-primary/30">
              © 2026 Rifki & Jeni Wedding. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary/30 hover:text-gold cursor-pointer transition-colors">Privacy Policy</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary/30 hover:text-gold cursor-pointer transition-colors">Digital Invitation</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
