"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, CreditCard, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingParticles } from "@/components/shared/FloatingParticles";
import { GoldSparkle } from "@/components/shared/GoldSparkle";
import { useToast } from "@/components/shared/Toast";

interface AccountInfo {
  label: string;
  bank: string;
  account: string;
  name: string;
}

const groomAccount: AccountInfo = {
  label: "Mempelai Pria",
  bank: "BANK MANDIRI",
  account: "1080026936022",
  name: "M. RIFKI ILMI",
};

const brideAccount: AccountInfo = {
  label: "Mempelai Wanita",
  bank: "BANK SYARIAH INDONESIA",
  account: "7261942137",
  name: "JENI ADHIVA",
};

const CardFace = ({
  info,
  onCopy,
  onFlip,
  flipLabel,
}: {
  info: AccountInfo;
  onCopy: (account: string) => void;
  onFlip: () => void;
  flipLabel: string;
}) => (
  <div className="bg-white/95 p-8 rounded-[28px] border border-gold/10 shadow-2xl holo-card flex flex-col h-full">
    <div className="absolute top-6 right-6 h-2 w-2 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.35)] animate-sparkle" />
    <div className="absolute inset-0 bg-linear-to-b from-transparent via-gold/10 to-transparent opacity-70 pointer-events-none rounded-[28px]" />

    {/* Header */}
    <div className="relative flex items-center justify-between mb-2">
      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
        <CreditCard className="w-6 h-6 text-gold" />
      </div>
      <span className="font-sans text-xs font-bold uppercase tracking-widest text-dark/40">
        {info.bank}
      </span>
    </div>

    {/* Label mempelai */}
    <p className="relative font-sans text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-6">
      {info.label}
    </p>

    {/* Account info */}
    <div className="mb-auto relative">
      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-dark/40 mb-1">
        Nomor Rekening
      </p>
      <p className="font-serif text-2xl text-dark tracking-wider">
        {info.account}
      </p>
      <p className="font-sans text-sm text-dark/60 mt-2 italic">
        a.n {info.name}
      </p>
    </div>

    {/* Buttons */}
    <div className="flex flex-col gap-3 mt-6 relative">
      <Button
        variant="ghost"
        size="sm"
        className="w-full flex items-center justify-center gap-2 border border-gold/20 hover:bg-gold/5"
        onClick={() => onCopy(info.account)}
      >
        <Copy className="w-3 h-3" />
        Salin Nomor
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="w-full h-auto py-2.5 px-3 flex items-center justify-center gap-2 border-gold/30 text-dark/70 hover:bg-gold/5 hover:text-dark whitespace-normal text-center text-[10px] sm:text-xs tracking-wider"
        onClick={onFlip}
      >
        <RefreshCw className="w-3 h-3 shrink-0" />
        <span className="leading-tight">{flipLabel}</span>
      </Button>
    </div>
  </div>
);

const FlipBankCard = ({
  onCopy,
}: {
  onCopy: (account: string) => void;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-[380px]"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front — Mempelai Pria */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <CardFace
            info={groomAccount}
            onCopy={onCopy}
            onFlip={() => setIsFlipped(true)}
            flipLabel="Lihat Rekening Mempelai Wanita"
          />
        </div>

        {/* Back — Mempelai Wanita */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <CardFace
            info={brideAccount}
            onCopy={onCopy}
            onFlip={() => setIsFlipped(false)}
            flipLabel="Lihat Rekening Mempelai Pria"
          />
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

      <div className="container mx-auto px-6 max-w-md relative z-10">
        <div className="text-center mb-24 relative">
          <GoldSparkle size={20} className="absolute -top-4 left-12" />
          <GoldSparkle size={16} className="absolute top-6 right-12" />
          <div className="absolute left-1/2 top-16 h-2 w-2 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.35)] animate-sparkle" />
          <h2 className="font-serif text-5xl md:text-6xl text-dark mb-6 tracking-tight text-shimmer-gold">
            Kado Digital
          </h2>
          <div className="w-24 h-px bg-gold mx-auto mb-8 shimmer-line" />
          <p className="font-sans text-sm text-dark/60 leading-relaxed max-w-lg mx-auto">
            Kehadiran Anda adalah kado terindah bagi kami. Namun apabila ingin memberikan tanda kasih, dapat mengirimkannya melalui
            rekening berikut:
          </p>
        </div>

        <FlipBankCard onCopy={handleCopy} />
      </div>
    </section>
  );
};
