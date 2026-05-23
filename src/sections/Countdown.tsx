"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingParticles } from "@/components/shared/FloatingParticles";
import { GoldSparkle } from "@/components/shared/GoldSparkle";

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 glass rounded-xl flex items-center justify-center mb-3 border border-gold/20 shadow-xl glow-gold overflow-hidden">
      <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.35)] animate-sparkle" />
      {/* Shimmer sweep on the box */}
      <div className="absolute inset-0 shimmer-line pointer-events-none" />
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -20, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold"
        >
          {value.toString().padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-dark/60">
      {label}
    </span>
  </div>
);

export const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Animated particles */}
      <FloatingParticles count={15} speed={0.1} opacity={0.12} maxSize={1.5} />

      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            background: [
              "radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)",
              "radial-gradient(ellipse at 80% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)",
              "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.05) 0%, transparent 60%)",
              "radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 relative">
          <GoldSparkle
            size={12}
            className="absolute left-1/2 -translate-x-1/2 top-1 opacity-70"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-3xl text-dark mb-4 italic tracking-wide"
          >
            Hitung Mundur
          </motion.h2>
          <div className="w-16 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent mx-auto" />
        </div>

        <div className="flex justify-center gap-2 sm:gap-4 md:gap-8 max-w-2xl mx-auto">
          <TimeUnit value={timeLeft.days} label="Hari" />
          <TimeUnit value={timeLeft.hours} label="Jam" />
          <TimeUnit value={timeLeft.minutes} label="Menit" />
          <TimeUnit value={timeLeft.seconds} label="Detik" />
        </div>
      </div>
    </section>
  );
};
