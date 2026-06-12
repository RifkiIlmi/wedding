"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [newWishIds, setNewWishIds] = useState<Set<string>>(new Set());

  const ITEMS_PER_PAGE = 6;

  const fetchWishes = async (pageNum: number) => {
    const from = pageNum * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (!error && data) {
      if (data.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }
      setWishes((prev) => {
        const existingIds = new Set(prev.map((w) => w.id));
        const filteredNew = data.filter((w) => !existingIds.has(w.id));
        return [...prev, ...filteredNew];
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWishes(0);

    // Realtime subscription
    const channel = supabase
      .channel("wishes-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "wishes" },
        (payload) => {
          const newWish = payload.new as Wish;
          setWishes((prev) => {
            if (prev.some((w) => w.id === newWish.id)) return prev;
            // Prepend new wishes (unshift)
            return [newWish, ...prev];
          });
          setNewWishIds((prevNew) => new Set([...prevNew, newWish.id]));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
      // Deterministic fallback for old wishes
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
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200/60 text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Hadir
          </span>
        );
      case "maybe":
        return (
          <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 border border-orange-200/60 text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            Ragu-ragu
          </span>
        );
      case "not_attending":
        return (
          <span className="inline-flex items-center gap-1.5 bg-stone-50 text-stone-500 border border-stone-200/60 text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
            Absen
          </span>
        );
    }
  };

  if (loading && page === 0) return null;

  return (
    <section className="relative py-24 md:py-32 bg-secondary/10 overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.2);
          border-radius: 9px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.4);
        }
        @keyframes pulseSubtle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.98; transform: scale(1.005); }
        }
        .animate-pulse-subtle {
          animation: pulseSubtle 3s infinite ease-in-out;
        }
      `}} />

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
        <div className="text-center mb-16 relative">
          <GoldSparkle size={20} className="absolute -top-4 left-12" />
          <GoldSparkle size={14} className="absolute top-6 right-14" />
          <div className="absolute left-1/2 top-10 h-2 w-2 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.35)] animate-sparkle" />
          <h2 className="font-serif text-5xl md:text-6xl text-dark mb-6 tracking-tight text-shimmer-gold">
            Ucapan & Doa
          </h2>
          <div className="w-24 h-px bg-gold mx-auto mb-8 shimmer-line" />
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold/60 italic">
            Doa restu tulus dari keluarga & kerabat
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {wishes.length > 0 ? (
            <>
              <div className="max-h-[520px] overflow-y-auto pr-2 md:pr-4 custom-scrollbar mb-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <AnimatePresence initial={false}>
                    {wishes.map((wish, index) => {
                      const { cleanMessage, attendance } = parseMessage(wish);
                      const isNew = newWishIds.has(wish.id);

                      return (
                        <motion.div
                          key={wish.id}
                          initial={isNew ? { opacity: 0, y: -25, scale: 0.95 } : { opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{
                            duration: 0.4,
                            delay: isNew ? 0 : index * 0.05,
                            ease: "easeOut",
                          }}
                          className={`p-6 md:p-8 rounded-[24px] shadow-xl border relative transition-all duration-300 ${
                            isNew
                              ? "bg-amber-50/90 border-gold/70 shadow-[0_0_15px_rgba(212,175,55,0.25)] animate-pulse-subtle"
                              : "bg-white/95 border-gold/10 hover:border-gold/25"
                          }`}
                        >
                          <div className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full bg-gold/70 shadow-[0_0_10px_rgba(212,175,55,0.3)] animate-sparkle" />
                          <div className="absolute top-4 right-8 opacity-[0.03] font-serif text-6xl pointer-events-none">
                            &ldquo;
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                            <h4 className="font-serif text-lg text-dark font-medium truncate max-w-[180px]">
                              {wish.name}
                            </h4>
                            <div className="flex items-center gap-2">
                              {getBadge(attendance)}
                              <span className="text-[10px] text-dark/40 font-sans tracking-wide">
                                {getRelativeTime(wish.created_at)}
                              </span>
                            </div>
                          </div>

                          <p className="font-sans text-sm text-dark/60 leading-relaxed italic break-words">
                            &ldquo;{cleanMessage}&rdquo;
                          </p>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {hasMore && (
                <div className="text-center">
                  <button
                    onClick={() => {
                      const nextPage = page + 1;
                      setPage(nextPage);
                      fetchWishes(nextPage);
                    }}
                    className="px-6 py-2.5 rounded-full border border-gold/30 text-gold hover:bg-gold/5 active:scale-95 transition-all font-sans text-xs uppercase tracking-widest font-medium"
                  >
                    Tampilkan Lebih Banyak
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

