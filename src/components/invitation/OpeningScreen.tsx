"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Music, Play } from "lucide-react";
import { FloatingParticles } from "@/components/shared/FloatingParticles";

interface OpeningScreenProps {
  guestName?: string;
  onOpen: () => void;
}

export const OpeningScreen = ({
  guestName = "Tamu Undangan",
  onOpen,
}: OpeningScreenProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(onOpen, 1000); // Delay to allow animation to complete
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary text-dark overflow-hidden"
        >
          {/* Floating Particles */}
          <FloatingParticles count={30} speed={0.2} opacity={0.3} maxSize={2} />

          {/* Background Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Ornamental corners */}
            <div className="absolute top-8 left-8 w-20 h-20 md:w-32 md:h-32">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-gold/40 to-transparent" />
              <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-gold/40 to-transparent" />
            </div>
            <div className="absolute top-8 right-8 w-20 h-20 md:w-32 md:h-32">
              <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-gold/40 to-transparent" />
              <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-gold/40 to-transparent" />
            </div>
            <div className="absolute bottom-8 left-8 w-20 h-20 md:w-32 md:h-32">
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-gold/40 to-transparent" />
              <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-gold/40 to-transparent" />
            </div>
            <div className="absolute bottom-8 right-8 w-20 h-20 md:w-32 md:h-32">
              <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-gold/40 to-transparent" />
              <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-gold/40 to-transparent" />
            </div>

            {/* Bokeh glow circles */}
            <div className="bokeh-circle w-64 h-64 top-10 -left-20 opacity-40" />
            <div className="bokeh-circle w-48 h-48 bottom-20 -right-10 opacity-30" style={{ animationDelay: '3s' }} />
            <div className="bokeh-circle w-32 h-32 top-1/3 right-1/4 opacity-20" style={{ animationDelay: '5s' }} />
          </div>

          {/* Pulsing gold glow behind names */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gold/5 blur-[100px] glow-gold pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center z-10 px-6"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ delay: 0.3, duration: 1.5 }}
              className="font-sans uppercase text-xs mb-8 text-gold-dark"
            >
              Undangan Pernikahan
            </motion.p>

            <h1 className="font-serif text-5xl md:text-7xl mb-6 text-dark leading-tight">
              Rifki <span className="text-shimmer-gold">&</span> Jeni
            </h1>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-8" />

            <div className="mt-12 mb-8">
              <p className="font-sans text-sm tracking-widest text-dark/60 mb-2 italic">
                Kepada Yth. Bapak/Ibu/Saudara/i
              </p>
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="font-serif text-3xl md:text-4xl text-dark"
              >
                {guestName}
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={handleOpen}
                className="group relative overflow-hidden"
              >
                {/* Shimmer sweep on button */}
                <span className="absolute inset-0 shimmer-line" />
                <span className="relative z-10 flex items-center gap-2">
                  Buka Undangan
                  <Play className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 flex items-center gap-2 text-dark/40 text-xs tracking-widest font-sans uppercase z-10"
          >
            <Music className="w-3 h-3" />
            Musik latar akan diputar otomatis
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
