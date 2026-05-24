"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

  useEffect(() => {
    const fetchWishes = async () => {
      const { data, error } = await supabase
        .from("wishes")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (!error && data) {
        setWishes(data);
      }
      setLoading(false);
    };

    fetchWishes();

    // Realtime subscription
    const channel = supabase
      .channel("wishes-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "wishes" },
        (payload) => {
          setWishes((prev) => [payload.new as Wish, ...prev]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) return null;

  return (
    <section className="relative py-24 md:py-32 bg-secondary/10 overflow-hidden">
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
          <div className="grid gap-6 md:grid-cols-2">
            {wishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="bg-white/95 p-8 rounded-[28px] shadow-2xl border border-gold/10 holo-card relative transition-transform hover:-translate-y-1"
              >
                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.35)] animate-sparkle" />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-gold/10 to-transparent opacity-60 pointer-events-none" />
                <div className="absolute top-4 right-6 opacity-5 font-serif text-6xl">
                  &ldquo;
                </div>
                <h4 className="font-serif text-xl text-dark mb-4">
                  {wish.name}
                </h4>
                <p className="font-sans text-sm text-dark/60 leading-relaxed italic">
                  &ldquo;{wish.message}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>

          {wishes.length === 0 && (
            <p className="text-center font-sans text-dark/40 italic">
              Jadilah yang pertama menuliskan ucapan!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
