"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { FloatingParticles } from "@/components/shared/FloatingParticles";
import { GoldSparkle } from "@/components/shared/GoldSparkle";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    gsap.to(imageRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.from(contentRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5,
    });
  }, []);

  // Staggered letter animation variants
  const nameText = "Rifki";
  const nameText2 = "Jeni";

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-dark/40" />
      </div>

      {/* Film grain overlay */}
      <div className="absolute inset-0 z-3 film-grain pointer-events-none" />

      {/* Floating particles layer */}
      <FloatingParticles
        count={50}
        speed={0.4}
        opacity={0.5}
        maxSize={2.5}
        color="#D4AF37"
      />

      {/* Bokeh circles */}
      <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
        <div className="bokeh-circle w-96 h-96 -top-20 -left-20 opacity-20" />
        <div
          className="bokeh-circle w-72 h-72 top-1/3 -right-16 opacity-15"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="bokeh-circle w-56 h-56 bottom-10 left-1/4 opacity-15"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="bokeh-circle w-40 h-40 top-1/4 left-1/3 opacity-10"
          style={{ animationDelay: "6s" }}
        />
        <GoldSparkle
          size={18}
          className="absolute left-14 bottom-32 opacity-80"
        />
        <GoldSparkle
          size={14}
          className="absolute right-12 top-28 opacity-70"
        />
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center text-primary px-6"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="font-sans uppercase text-sm mb-6 tracking-[0.4em]"
        >
          Save The Date
        </motion.p>

        {/* Staggered letter animation for names */}
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 leading-tight drop-shadow-2xl">
          <span className="inline-block">
            {nameText.split("").map((char, i) => (
              <motion.span
                key={`r-${i}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8 + i * 0.06,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>{" "}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "backOut" }}
            className="italic text-shimmer-gold inline-block"
          >
            &
          </motion.span>{" "}
          <span className="inline-block">
            {nameText2.split("").map((char, i) => (
              <motion.span
                key={`j-${i}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8 + (i + nameText.length + 1) * 0.06,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        <div className="flex items-center justify-center gap-4 mb-12">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="h-px bg-gold/50"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="font-sans text-xl tracking-widest font-light"
          >
            11 . 07 . 2026
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="h-px bg-gold/50"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary opacity-60">
          Scroll to Explore
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-5 h-5 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
};
