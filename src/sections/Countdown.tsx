"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GoldSparkle } from "@/components/shared/GoldSparkle";

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center flex-1 px-2 sm:px-4">
    <div className="h-20 sm:h-28 md:h-32 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(8px)", y: -12 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-primary font-extralight tracking-widest select-none"
        >
          {value.toString().padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="font-sans text-[9px] sm:text-xs uppercase tracking-[0.4em] text-primary/60 mt-4 text-center">
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
    <section id="countdown" className="relative h-[500px] md:h-[650px] flex items-center justify-center overflow-hidden bg-dark">
      {/* Background Grayscale pre-wedding image with slow Ken Burns effect */}
      <div className="absolute inset-0 z-0">
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes kenBurns {
            0% { transform: scale(1.03); }
            100% { transform: scale(1.12); }
          }
          .animate-ken-burns {
            animation: kenBurns 20s ease-in-out infinite alternate;
          }
        `}} />
        <Image
          src="/assets/images/count.jpg"
          alt="Wedding Pre-wedding"
          fill
          priority
          sizes="100vw"
          className="object-cover filter grayscale contrast-[1.1] brightness-[0.35] animate-ken-burns"
        />
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-radial-to-c from-transparent via-black/20 to-black/60 pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <div className="mb-12 relative">
          <GoldSparkle
            size={14}
            className="absolute left-1/2 -translate-x-1/2 -top-8 opacity-60"
          />
          <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.45em] text-gold/80 mb-3">
            Menuju Hari Bahagia
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-primary italic font-light tracking-wider">
            Counting the Days
          </h2>
        </div>

        {/* Clean Grid Timer (no boxes, vertical line dividers) */}
        <div className="flex justify-center items-center divide-x divide-primary/10 max-w-3xl mx-auto">
          <TimeUnit value={timeLeft.days} label="Hari" />
          <TimeUnit value={timeLeft.hours} label="Jam" />
          <TimeUnit value={timeLeft.minutes} label="Menit" />
          <TimeUnit value={timeLeft.seconds} label="Detik" />
        </div>
      </div>
    </section>
  );
};
