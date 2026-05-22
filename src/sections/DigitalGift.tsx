'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'

const BankCard = ({ bank, account, name }: any) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(account)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white p-8 rounded-xl border border-gold/10 shadow-xl relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-8">
         <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-gold" />
         </div>
         <span className="font-sans text-xs font-bold uppercase tracking-widest text-dark/40">{bank}</span>
      </div>

      <div className="mb-8">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-dark/40 mb-1">Account Number</p>
        <p className="font-serif text-2xl text-dark tracking-wider">{account}</p>
        <p className="font-sans text-sm text-dark/60 mt-2 italic">a.n {name}</p>
      </div>

      <Button 
        variant="ghost" 
        size="sm" 
        className="w-full flex items-center gap-2 border border-gold/20"
        onClick={handleCopy}
      >
        {copied ? (
          <>
            <Check className="w-3 h-3" />
            Copied
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            Copy Number
          </>
        )}
      </Button>
    </motion.div>
  )
}

export const DigitalGift = () => {
  return (
    <section className="py-24 md:py-32 bg-primary">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-dark mb-6 tracking-tight">Digital Gift</h2>
          <div className="w-24 h-px bg-gold mx-auto mb-8" />
          <p className="font-sans text-sm text-dark/60 leading-relaxed max-w-lg mx-auto">
             Your presence is the greatest gift of all. However, if you wish to honor us with a gift, a contribution towards our new journey would be greatly appreciated.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <BankCard 
            bank="CHASE BANK"
            account="1234567890"
            name="Sarah J. Bride"
          />
          <BankCard 
            bank="WELLS FARGO"
            account="0987654321"
            name="Michael K. Groom"
          />
        </div>

        <div className="mt-16 flex flex-col items-center">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-6">Or Scan QR Code</p>
            <div className="w-48 h-48 bg-white p-4 rounded-xl shadow-2xl border border-gold/10">
                 {/* Placeholder for QR code */}
                 <div className="w-full h-full bg-dark/5 flex items-center justify-center border-2 border-dashed border-gold/20">
                    <span className="font-serif italic text-dark/40">QRIS</span>
                 </div>
            </div>
        </div>
      </div>
    </section>
  )
}
