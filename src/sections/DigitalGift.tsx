"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, CreditCard, QrCode, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingParticles } from "@/components/shared/FloatingParticles";
import { GoldSparkle } from "@/components/shared/GoldSparkle";
import { useToast } from "@/components/shared/Toast";

interface BankCardProps {
  bank: string;
  account: string;
  name: string;
  onCopy: (account: string) => void;
}

const BankCard = ({ bank, account, name, onCopy }: BankCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full h-[340px]" style={{ perspective: "1000px" }}>
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 bg-white/95 p-8 rounded-[28px] border border-gold/10 shadow-2xl holo-card flex flex-col"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="absolute top-6 right-6 h-2 w-2 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.35)] animate-sparkle" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-gold/10 to-transparent opacity-70 pointer-events-none rounded-[28px]" />
          
          <div className="relative flex items-center justify-between mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-gold" />
            </div>
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-dark/40">
              {bank}
            </span>
          </div>

          <div className="mb-auto">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-dark/40 mb-1">
              Nomor Rekening
            </p>
            <p className="font-serif text-2xl text-dark tracking-wider">
              {account}
            </p>
            <p className="font-sans text-sm text-dark/60 mt-2 italic">a.n {name}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 flex items-center gap-2 border border-gold/20 hover:bg-gold/5"
              onClick={() => onCopy(account)}
            >
              <Copy className="w-3 h-3" />
              Salin Nomor
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 flex items-center gap-2 border-gold/30 text-dark/70 hover:bg-gold/5 hover:text-dark"
              onClick={() => setIsFlipped(true)}
            >
              <QrCode className="w-3 h-3" />
              Tampilkan QRIS
            </Button>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 bg-white/95 p-8 rounded-[28px] border border-gold/10 shadow-2xl holo-card flex flex-col items-center justify-center text-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="absolute top-6 left-6 h-2 w-2 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.35)] animate-sparkle" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-gold/10 to-transparent opacity-70 pointer-events-none rounded-[28px]" />
          
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-6">
            Pindai QRIS
          </p>
          
          <div className="w-32 h-32 bg-dark/5 flex items-center justify-center border-2 border-dashed border-gold/30 rounded-2xl mb-8 relative">
            <span className="font-serif italic text-dark/40">QRIS</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-center gap-2 border border-gold/20 hover:bg-gold/5 text-dark/60"
            onClick={() => setIsFlipped(false)}
          >
            <ArrowLeft className="w-3 h-3" />
            Kembali
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export const DigitalGift = () => {
  const { showToast, ToastComponent } = useToast();

  const handleCopy = (account: string) => {
    navigator.clipboard.writeText(account);
    showToast("Nomor rekening berhasil disalin", "success");
  };

  return (
    <section id="gift" className="relative py-32 md:py-48 bg-primary overflow-hidden">
      <ToastComponent />
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
        <div className="text-center mb-24 relative">
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

        <div className="grid md:grid-cols-2 gap-12">
          <BankCard
            bank="BANK MANDIRI"
            account="1234567890"
            name="JENI ADHIVA"
            onCopy={handleCopy}
          />
          <BankCard
            bank="BANK MANDIRI"
            account="0987654321"
            name="M. RIFKI ILMI"
            onCopy={handleCopy}
          />
        </div>
      </div>
    </section>
  );
};
