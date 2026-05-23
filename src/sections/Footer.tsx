"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { FloatingParticles } from "@/components/shared/FloatingParticles";
import { GoldSparkle } from "@/components/shared/GoldSparkle";

export const Footer = () => {
  return (
    <footer className="relative py-20 bg-dark text-primary border-t border-gold/10 overflow-hidden">
      <FloatingParticles
        count={22}
        color="#D4AF3780"
        speed={0.22}
        maxSize={3.5}
        minSize={0.9}
        opacity={0.25}
        className="opacity-70"
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="bokeh-circle w-36 h-36 left-10 top-12 opacity-40" />
        <div className="bokeh-circle w-40 h-40 right-10 top-20 opacity-30" />
      </div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <GoldSparkle size={14} className="absolute top-6 left-12 opacity-50" />
        <GoldSparkle
          size={12}
          className="absolute top-10 right-14 opacity-40"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-8 tracking-tight text-shimmer-gold">
            Terima Kasih
          </h2>

          <p className="font-sans text-sm text-primary/60 max-w-xl mx-auto leading-relaxed mb-12 italic">
            "Dua jiwa namun satu pikiran, dua hati yang berdenyut selaras."
            <br />
            Kami sangat menantikan kehadiran Anda untuk merayakan hari istimewa
            ini bersama kami.
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="relative flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-gold/30" />
              <Heart className="w-5 h-5 text-gold fill-gold/20 animate-pulse" />
              <div className="absolute -left-3 top-0 h-2 w-2 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.35)] animate-sparkle" />
              <div className="h-px w-8 bg-gold/30" />
            </div>
            <h3 className="font-serif text-3xl text-gold text-shimmer-gold">
              Rifki & Jeni
            </h3>
          </div>

          <div className="mt-24 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] uppercase tracking-[0.4em] text-primary/30">
              © 2026 Rifki & Jeni Wedding. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary/30 hover:text-gold cursor-pointer transition-colors">
                Privacy Policy
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary/30 hover:text-gold cursor-pointer transition-colors">
                Digital Invitation
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
