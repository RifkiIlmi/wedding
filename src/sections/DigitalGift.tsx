"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingParticles } from "@/components/shared/FloatingParticles";
import { GoldSparkle } from "@/components/shared/GoldSparkle";

interface BankCardProps {
  bank: string;
  account: string;
  name: string;
}

const BankCard = ({ bank, account, name }: BankCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(account);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white/95 p-8 rounded-[28px] border border-gold/10 shadow-2xl holo-card relative overflow-hidden"
    >
      <div className="absolute top-6 right-6 h-2 w-2 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.35)] animate-sparkle" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-gold/10 to-transparent opacity-70 pointer-events-none" />
      <div className="relative flex items-center justify-between mb-8">
        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
          <CreditCard className="w-6 h-6 text-gold" />
        </div>
        <span className="font-sans text-xs font-bold uppercase tracking-widest text-dark/40">
          {bank}
        </span>
      </div>

      <div className="mb-8">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-dark/40 mb-1">
          Nomor Rekening
        </p>
        <p className="font-serif text-2xl text-dark tracking-wider">
          {account}
        </p>
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
            Tersalin
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            Salin Nomor
          </>
        )}
      </Button>
    </motion.div>
  );
};

export const DigitalGift = () => {
  return (
    <section className="relative py-24 md:py-32 bg-primary overflow-hidden">
      <FloatingParticles
        count={28}
        color="#D4AF3780"
        speed={0.18}
        maxSize={4}
        minSize={1.2}
        opacity={0.32}
        className="opacity-70"
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="bokeh-circle w-40 h-40 left-10 top-14 opacity-40" />
        <div className="bokeh-circle w-44 h-44 right-12 top-24 opacity-30" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16 relative">
          <GoldSparkle size={20} className="absolute -top-4 left-12" />
          <GoldSparkle size={16} className="absolute top-6 right-12" />
          <div className="absolute left-1/2 top-16 h-2 w-2 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.35)] animate-sparkle" />
          <h2 className="font-serif text-5xl md:text-6xl text-dark mb-6 tracking-tight text-shimmer-gold">
            Kado Digital
          </h2>
          <div className="w-24 h-px bg-gold mx-auto mb-8 shimmer-line" />
          <p className="font-sans text-sm text-dark/60 leading-relaxed max-w-lg mx-auto">
            Kehadiran Anda adalah kado terindah bagi kami. Namun apabila Anda
            ingin memberikan tanda kasih, Anda dapat mengirimkannya melalui
            rekening berikut:
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
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-6">
            Atau Pindai Kode QR
          </p>
          <div className="w-48 h-48 bg-white/95 p-4 rounded-[28px] shadow-2xl border border-gold/10 holo-card relative overflow-hidden">
            <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.35)] animate-sparkle" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-gold/10 to-transparent opacity-60 pointer-events-none" />
            {/* Placeholder for QR code */}
            <div className="relative w-full h-full bg-dark/5 flex items-center justify-center border-2 border-dashed border-gold/20 rounded-3xl">
              <span className="font-serif italic text-dark/40">QRIS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
