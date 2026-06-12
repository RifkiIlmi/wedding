"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingParticles } from "@/components/shared/FloatingParticles";
import { GoldSparkle } from "@/components/shared/GoldSparkle";

const images = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519225495810-758b63300051?auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507504038482-7621c4b8e05a?auto=format&fit=crop",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop",
];

export const Gallery = () => {
  const [displayImages, setDisplayImages] = useState(images);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleSwap = (index: number) => {
    const newImages = [...displayImages];
    const temp = newImages[0];
    newImages[0] = newImages[index];
    newImages[index] = temp;
    setDisplayImages(newImages);
  };

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const nextPhoto = () => {
    setPhotoIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  const prevPhoto = () => {
    setPhotoIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevPhoto();
      } else if (e.key === "ArrowRight") {
        nextPhoto();
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, displayImages]);

  const mainImg = displayImages[0];
  const smallImg1 = displayImages[1];
  const smallImg2 = displayImages[2];
  const smallImg3 = displayImages[3];
  const smallImg4 = displayImages[4];

  return (
    <section className="relative py-32 md:py-48 bg-secondary/20 overflow-hidden">
      <FloatingParticles
        count={20}
        color="#D4AF3780"
        speed={0.22}
        maxSize={3.5}
        minSize={1.1}
        opacity={0.35}
        className="opacity-80"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 relative">
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

        {/* 5-Card Interactive Collage Picker */}
        <div className="grid grid-cols-4 md:grid-cols-5 md:grid-rows-2 gap-2 md:gap-4 h-auto md:h-[550px] overflow-hidden rounded-2xl md:rounded-3xl">
          {/* Card 1: Main Photo */}
          <div
            onClick={() => openLightbox(0)}
            className="col-span-4 md:col-span-3 md:row-span-2 relative overflow-hidden rounded-xl md:rounded-3xl border border-gold/15 cursor-pointer group aspect-[4/3] md:aspect-auto"
          >
            <motion.img
              layoutId={`gallery-img-${mainImg}`}
              src={`${mainImg}&w=800&q=80&fm=webp`}
              alt="Momen Utama"
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent opacity-85 pointer-events-none" />
            <div className="absolute left-4 bottom-4 md:left-6 md:bottom-6 right-4 md:right-6 flex items-center justify-between gap-4">
              <span className="bg-dark/80 text-primary text-xs uppercase tracking-[0.2em] px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-sm border border-gold/10">
                Lihat Detail
              </span>
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            </div>
          </div>

          {/* Card 2: Small Photo 1 */}
          <div
            onClick={() => handleSwap(1)}
            className="col-span-1 md:col-span-1 md:row-span-1 relative overflow-hidden rounded-lg md:rounded-2xl border border-gold/15 cursor-pointer group aspect-square md:aspect-auto"
          >
            <motion.img
              layoutId={`gallery-img-${smallImg1}`}
              src={`${smallImg1}&w=300&q=75&fm=webp`}
              alt="Momen 2"
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-300" />
          </div>

          {/* Card 3: Small Photo 2 */}
          <div
            onClick={() => handleSwap(2)}
            className="col-span-1 md:col-span-1 md:row-span-1 relative overflow-hidden rounded-lg md:rounded-2xl border border-gold/15 cursor-pointer group aspect-square md:aspect-auto"
          >
            <motion.img
              layoutId={`gallery-img-${smallImg2}`}
              src={`${smallImg2}&w=300&q=75&fm=webp`}
              alt="Momen 3"
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-300" />
          </div>

          {/* Card 4: Small Photo 3 */}
          <div
            onClick={() => handleSwap(3)}
            className="col-span-1 md:col-span-1 md:row-span-1 relative overflow-hidden rounded-lg md:rounded-2xl border border-gold/15 cursor-pointer group aspect-square md:aspect-auto"
          >
            <motion.img
              layoutId={`gallery-img-${smallImg3}`}
              src={`${smallImg3}&w=300&q=75&fm=webp`}
              alt="Momen 4"
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-300" />
          </div>

          {/* Card 5: Small Photo 4 (Overlay "+X foto") */}
          <div
            onClick={() => openLightbox(4)}
            className="col-span-1 md:col-span-1 md:row-span-1 relative overflow-hidden rounded-lg md:rounded-2xl border border-gold/15 cursor-pointer group aspect-square md:aspect-auto"
          >
            <motion.img
              layoutId={`gallery-img-${smallImg4}`}
              src={`${smallImg4}&w=300&q=75&fm=webp`}
              alt="Momen 5"
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-300 flex flex-col items-center justify-center text-center p-2">
              <span className="text-primary font-serif text-lg md:text-2xl font-bold tracking-wider">
                +{displayImages.length - 4}
              </span>
              <span className="text-primary/80 text-[10px] md:text-xs uppercase tracking-widest mt-1 hidden sm:inline">
                Foto
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-all duration-500 p-3 bg-white/10 hover:bg-white/20 rounded-full z-55"
              aria-label="Tutup"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left Control */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-500 z-55"
              aria-label="Sebelumnya"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Main Lightbox Image */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center select-none"
            >
              <img
                src={`${displayImages[photoIndex]}&w=1200&q=85&fm=webp`}
                alt={`Detail Momen ${photoIndex + 1}`}
                className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl border border-white/10"
                loading="lazy"
              />
            </div>

            {/* Right Control */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-500 z-55"
              aria-label="Selanjutnya"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Indicator Counter */}
            <div className="absolute bottom-6 bg-white/10 backdrop-blur-sm text-white text-xs md:text-sm tracking-widest px-4 py-2 rounded-full border border-white/10">
              {photoIndex + 1} / {displayImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

