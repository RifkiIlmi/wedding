"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Music, Play } from "lucide-react";

interface OpeningScreenProps {
  guestName?: string;
  onOpen: () => void;
}

export const OpeningScreen = ({
  guestName = "Our Guest",
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
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 border-l border-t border-gold -translate-x-1/2 -translate-y-1/2 rotate-45" />
            <div className="absolute bottom-0 right-0 w-64 h-64 border-r border-b border-gold translate-x-1/2 translate-y-1/2 rotate-45" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center z-10 px-6"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-xs mb-8 text-gold-dark">
              The Wedding Invitation of
            </p>

            <h1 className="font-serif text-5xl md:text-7xl mb-6 text-dark leading-tight">
              Rifki <span className="text-gold">&</span> Jeni
            </h1>

            <div className="mt-12 mb-8">
              <p className="font-sans text-sm tracking-widest text-dark/60 mb-2 italic">
                Dear,
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-dark">
                {guestName}
              </h2>
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={handleOpen}
              className="group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Open Invitation
                <Play className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 flex items-center gap-2 text-dark/40 text-xs tracking-widest font-sans uppercase"
          >
            <Music className="w-3 h-3" />
            Background music will play
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
