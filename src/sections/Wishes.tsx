"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { FloatingParticles } from "@/components/shared/FloatingParticles";
import { GoldSparkle } from "@/components/shared/GoldSparkle";

interface Wish {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export const Wishes = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const ITEMS_TO_LOAD = 15;

  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(ITEMS_TO_LOAD);

    if (!error && data) {
      setWishes(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWishes();

    // Detect screen size for 1 vs 2 columns layout
    const media = window.matchMedia("(min-width: 768px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);

    // Realtime subscription to automatically prepend new wishes
    const channel = supabase
      .channel("wishes-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "wishes" },
        (payload) => {
          const newWish = payload.new as Wish;
          setWishes((prev) => {
            if (prev.some((w) => w.id === newWish.id)) return prev;
            return [newWish, ...prev.slice(0, ITEMS_TO_LOAD - 1)];
          });
          setCurrentIndex(0); // Show the new wish immediately
        },
      )
      .subscribe();

    return () => {
      media.removeEventListener("change", listener);
      supabase.removeChannel(channel);
    };
  }, []);

  // Setup autoplay carousel (resets timer on manual navigation)
  useEffect(() => {
    if (wishes.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wishes.length);
    }, 7000); // Rotate every 7 seconds

    return () => clearInterval(timer);
  }, [wishes.length, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + wishes.length) % wishes.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % wishes.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Baru saja";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Kemarin";
    if (diffInDays < 7) return `${diffInDays} hari yang lalu`;

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const parseMessage = (wish: Wish) => {
    let attendance: "attending" | "maybe" | "not_attending" = "attending";
    let cleanMessage = wish.message;

    if (wish.message.includes("|attendance:")) {
      const parts = wish.message.split("|attendance:");
      cleanMessage = parts[0].trim();
      const status = parts[1].trim();
      if (status === "attending" || status === "maybe" || status === "not_attending") {
        attendance = status;
      }
    } else {
      const hash = wish.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const mod = hash % 3;
      if (mod === 0) attendance = "attending";
      else if (mod === 1) attendance = "maybe";
      else attendance = "not_attending";
    }

    return { cleanMessage, attendance };
  };

  const getBadge = (status: "attending" | "maybe" | "not_attending") => {
    switch (status) {
      case "attending":
        return (
          <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-300 border border-gold/20 text-[9px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full">
            <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
            Hadir
          </span>
        );
      case "maybe":
        return (
          <span className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-300 border border-orange-500/20 text-[9px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            Ragu-ragu
          </span>
        );
      case "not_attending":
        return (
          <span className="inline-flex items-center gap-1.5 bg-stone-500/10 text-stone-300 border border-stone-500/20 text-[9px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
            Absen
          </span>
        );
    }
  };

  const getVisibleWishes = () => {
    if (wishes.length === 0) return [];
    if (wishes.length === 1) return [wishes[0]];

    if (isDesktop) {
      const nextIndex = (currentIndex + 1) % wishes.length;
      return [wishes[currentIndex], wishes[nextIndex]];
    }

    return [wishes[currentIndex]];
  };

  if (loading) return null;

  return (
    <section id="wishes" className="relative py-32 md:py-48 bg-dark overflow-hidden">
      <FloatingParticles
        count={24}
        color="#D4AF3780"
        speed={0.2}
        maxSize={3.5}
        minSize={1}
        opacity={0.25}
        className="opacity-80"
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="bokeh-circle w-36 h-36 left-8 top-16 opacity-50" />
        <div className="bokeh-circle w-44 h-44 right-10 top-24 opacity-30" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 relative">
          <GoldSparkle size={20} className="absolute -top-4 left-12" />
          <GoldSparkle size={14} className="absolute top-6 right-14" />
          <div className="absolute left-1/2 top-10 h-2 w-2 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.35)] animate-sparkle" />
          <h2 className="font-serif text-5xl md:text-6xl text-primary mb-6 tracking-tight text-shimmer-gold">
            Ucapan & Doa
          </h2>
          <div className="w-24 h-px bg-gold mx-auto mb-8 shimmer-line" />
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold/80 italic">
            Doa restu tulus dari keluarga & kerabat
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {wishes.length > 0 ? (
            <>
              {/* Carousel Container */}
              <div className="relative min-h-[380px] md:min-h-[300px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    className={`grid gap-8 w-full ${
                      getVisibleWishes().length === 2
                        ? "grid-cols-1 md:grid-cols-2"
                        : "grid-cols-1 max-w-xl mx-auto"
                    }`}
                  >
                    {getVisibleWishes().map((wish) => {
                      const { cleanMessage, attendance } = parseMessage(wish);
                      return (
                        <div
                          key={wish.id}
                          className="flex flex-col items-center justify-between text-center bg-white/5 border border-gold/10 backdrop-blur-md p-8 md:p-12 rounded-[32px] shadow-sm relative overflow-hidden flex-1 min-h-[280px] holo-card"
                        >
                          {/* Storybook quote decoration */}
                          <div className="absolute top-0 left-6 text-gold/10 font-serif text-[10rem] leading-none select-none pointer-events-none">
                            &ldquo;
                          </div>

                          <div className="flex-1 flex flex-col justify-center items-center z-10 w-full pt-8">
                            <p className="font-serif text-lg md:text-xl text-primary/90 leading-relaxed italic break-words w-full max-w-md">
                              &ldquo;{cleanMessage}&rdquo;
                            </p>
                          </div>

                          <div className="w-12 h-[1px] bg-gold/20 my-6 z-10" />

                          <div className="z-10">
                            <h4 className="font-serif text-base md:text-lg text-gold font-semibold tracking-wide">
                              {wish.name}
                            </h4>
                            <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-primary/40 font-sans tracking-widest uppercase">
                              {getBadge(attendance)}
                              <span>•</span>
                              <span>{getRelativeTime(wish.created_at)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              {wishes.length > getVisibleWishes().length && (
                <div className="flex justify-center items-center gap-6 mt-12">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-full border border-gold/20 text-gold/70 hover:text-gold hover:border-gold/50 hover:bg-gold/5 transition-all duration-300 active:scale-90"
                    aria-label="Previous wish"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Bullet Indicators */}
                  <div className="flex gap-1.5">
                    {wishes.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDotClick(idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          currentIndex === idx ? "bg-gold w-3" : "bg-gold/20 hover:bg-gold/40"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className="p-2 rounded-full border border-gold/20 text-gold/70 hover:text-gold hover:border-gold/50 hover:bg-gold/5 transition-all duration-300 active:scale-90"
                    aria-label="Next wish"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-center font-sans text-dark/40 italic py-12">
              Jadilah yang pertama menuliskan ucapan!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

