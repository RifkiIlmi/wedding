"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FloatingParticles } from "@/components/shared/FloatingParticles";
import { GoldSparkle } from "@/components/shared/GoldSparkle";

const images = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519225495810-758b63300051?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80",
];

const ImageLightbox = ({
  currentIndex,
  images,
  onClose,
  onNext,
  onPrev
}) => {
  return (
    <div
      onClick={(e) => {
        // Close when clicking on the backdrop (not the content)
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        className="relative w-[90vw] h-[90vh]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation arrows */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Image */}
        <Image
          src={images[currentIndex]}
          alt={`Wedding moment ${currentIndex + 1}`}
          layout="fill"
          objectFit="contain"
          className="rounded-2xl shadow-2xl"
        />
      </div>
    </div>
  );
};

export const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handle keyboard events
  const handleKeyDown = (e) => {
    if (!isLightboxOpen) return;

    switch (e.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowRight":
        goToNext();
        break;
      case "ArrowLeft":
        goToPrev();
        break;
      default:
        break;
    }
  };

  // Add and remove event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen]);

  return (
    <>
      <section className="relative py-24 md:py-32 bg-secondary/20 overflow-hidden">
        <FloatingParticles
          count={20}
          color="#D4AF3780"
          speed={0.22}
          maxSize={3.5}
          minSize={1.1}
          opacity={0.35}
          className="opacity-80"
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="bokeh-circle w-40 h-40 left-8 top-16 opacity-60" />
          <div className="bokeh-circle w-32 h-32 right-8 top-24 opacity-40" />
          <div className="bokeh-circle w-56 h-56 left-1/2 top-12 -translate-x-1/2 opacity-20" />

          <div className="absolute left-6 bottom-10 opacity-80 scale-[0.95] md:scale-100">
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="60" cy="60" r="48" fill="rgba(212,175,55,0.08)" />
              <path
                d="M60 16C58 22 50 24 46 30C42 36 46 48 52 54C58 60 74 58 78 52C82 46 82 34 76 28C70 22 62 14 60 16Z"
                fill="rgba(212,175,55,0.22)"
              />
              <path
                d="M100 60C92 62 86 70 84 78C82 86 88 98 94 98C100 98 106 90 108 82C110 74 108 66 100 60Z"
                fill="rgba(248,245,242,0.65)"
              />
              <path
                d="M26 58C22 66 22 76 28 84C34 92 48 94 54 88C60 82 58 68 52 62C46 56 30 50 26 58Z"
                fill="rgba(255,255,255,0.55)"
              />
              <circle cx="60" cy="60" r="10" fill="rgba(212,175,55,0.4)" />
            </svg>
          </div>

          <div className="absolute right-8 top-6 opacity-70 scale-[0.9] md:scale-100">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="42" fill="rgba(248,245,242,0.14)" />
              <path
                d="M50 10C48 16 42 18 38 24C34 30 38 42 44 48C50 54 64 52 68 46C72 40 72 28 66 22C60 16 52 8 50 10Z"
                fill="rgba(212,175,55,0.2)"
              />
              <path
                d="M24 52C20 58 20 68 26 76C32 84 46 86 52 80C58 74 56 60 50 54C44 48 28 42 24 52Z"
                fill="rgba(255,255,255,0.55)"
              />
              <path
                d="M74 52C70 58 70 68 76 76C82 84 96 86 102 80C108 74 106 60 100 54C94 48 78 42 74 52Z"
                fill="rgba(212,175,55,0.14)"
              />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-10 relative">
            <GoldSparkle size={22} className="absolute -top-4 left-12" />
            <GoldSparkle size={16} className="absolute top-8 right-16" />
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-dark mb-6 tracking-tight">
              Gallery
            </h2>
            <div className="w-24 h-px bg-gold mx-auto mb-8 shimmer-line" />
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold/60">
              Momen Bahagia
            </p>
          </div>

          <div className="relative">
            <div className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex gap-6 px-2 md:px-0 scroll-smooth">
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                  onClick={() => openLightbox(index)}
                  className="group relative shrink-0 w-[80vw] sm:w-[52vw] md:w-[32vw] min-w-67.5 overflow-hidden rounded-4xl shadow-2xl border border-gold/15 bg-dark/5 cursor-pointer"
                >
                  <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.4)] animate-sparkle" />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-gold/10 to-transparent opacity-80 pointer-events-none" />
                  <div className="relative w-full h-105 sm:h-115 md:h-130">
                    <Image
                      src={img}
                      alt={`Wedding moment ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-dark/70 via-transparent to-transparent opacity-80" />
                  <div className="absolute left-6 bottom-6 right-6 flex items-center justify-between gap-4">
                    <span className="bg-dark/80 text-primary text-xs uppercase tracking-[0.3em] px-4 py-2 rounded-full backdrop-blur-sm">
                      Momen {index + 1}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 flex justify-center gap-3">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-gold' : 'bg-dark/20'} transition-colors`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <ImageLightbox
          currentIndex={currentIndex}
          images={images}
          onClose={closeLightbox}
          onNext={goToNext}
          onPrev={goToPrev}
        />
      )}
    </>
  );
};