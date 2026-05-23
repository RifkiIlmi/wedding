"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import confetti from "canvas-confetti";
import { FloatingParticles } from "@/components/shared/FloatingParticles";
import { GoldSparkle } from "@/components/shared/GoldSparkle";

const rsvpSchema = z.object({
  name: z.string().min(2, "Nama wajib diisi"),
  attendance: z.enum(["attending", "not_attending"]),
  guests: z.string().optional(),
  message: z.string().min(5, "Silakan tulis ucapan singkat"),
});

type RSVPValues = z.infer<typeof rsvpSchema>;

export const RSVP = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RSVPValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attendance: "attending",
    },
  });

  const attendance = watch("attendance");

  const onSubmit = async (data: RSVPValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("wishes").insert([
        {
          name: data.name,
          message: data.message,
          // In a real app, we'd also save to a guests table
        },
      ]);

      if (error) throw error;

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#F8F5F2", "#1C1C1C"],
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 md:py-32 bg-dark text-primary overflow-hidden">
      <FloatingParticles
        count={30}
        color="#D4AF3780"
        speed={0.2}
        maxSize={4}
        minSize={1.2}
        opacity={0.35}
        className="opacity-80"
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="bokeh-circle w-40 h-40 -left-10 top-16 opacity-60" />
        <div className="bokeh-circle w-48 h-48 right-8 top-24 opacity-30" />
        <div className="bokeh-circle w-56 h-56 left-1/2 top-12 -translate-x-1/2 opacity-20" />
      </div>

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <div className="text-center mb-16 relative">
          <GoldSparkle size={20} className="absolute -top-4 left-10" />
          <GoldSparkle size={14} className="absolute top-4 right-14" />
          <h2 className="font-serif text-5xl md:text-6xl text-gold mb-6 tracking-tight text-shimmer-gold">
            R.S.V.P
          </h2>
          <div className="w-24 h-px bg-gold/30 mx-auto mb-8 shimmer-line" />
          <p className="font-sans text-sm text-primary/60 tracking-widest uppercase">
            Konfirmasi Kehadiran
          </p>
        </div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-12 border border-gold/20 bg-primary/5 rounded-4xl shadow-2xl holo-card"
          >
            <h3 className="font-serif text-3xl mb-4 text-gold text-shimmer-gold">
              Terima Kasih!
            </h3>
            <p className="font-sans text-primary/70 mb-8">
              Ucapan & Doa telah kami terima. Sampai jumpa di hari bahagia kami!
            </p>
            <Button variant="outline" onClick={() => setIsSubmitted(false)}>
              Kirim pesan lain
            </Button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 bg-white/5 border border-gold/10 rounded-4xl shadow-2xl p-8 backdrop-blur-xl holo-card relative"
          >
            <div className="absolute top-6 right-8 h-2 w-2 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.35)] animate-sparkle" />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="font-sans text-xs uppercase tracking-widest text-gold/80">
                  Nama
                </label>
                <input
                  {...register("name")}
                  className="w-full bg-transparent border-b border-gold/30 py-3 focus:outline-none focus:border-gold transition-colors font-serif text-xl"
                  placeholder="Masukkan nama Anda"
                />
                {errors.name && (
                  <p className="text-red-400 text-[10px] uppercase tracking-widest mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="font-sans text-xs uppercase tracking-widest text-gold/80">
                  Konfirmasi Kehadiran
                </label>
                <select
                  {...register("attendance")}
                  className="w-full bg-transparent border-b border-gold/30 py-3 focus:outline-none focus:border-gold transition-colors font-serif text-xl appearance-none"
                >
                  <option value="attending" className="bg-dark text-primary">
                    Saya akan hadir
                  </option>
                  <option
                    value="not_attending"
                    className="bg-dark text-primary"
                  >
                    Saya tidak bisa hadir
                  </option>
                </select>
              </div>
            </div>

            {attendance === "attending" && (
              <div className="space-y-2">
                <label className="font-sans text-xs uppercase tracking-widest text-gold/80">
                  Jumlah Tamu
                </label>
                <input
                  {...register("guests")}
                  type="number"
                  min="1"
                  max="5"
                  className="w-full bg-transparent border-b border-gold/30 py-3 focus:outline-none focus:border-gold transition-colors font-serif text-xl"
                  placeholder="Jumlah tamu"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="font-sans text-xs uppercase tracking-widest text-gold/80">
                Ucapan & Doa Restu
              </label>
              <textarea
                {...register("message")}
                rows={4}
                className="w-full bg-transparent border-b border-gold/30 py-3 focus:outline-none focus:border-gold transition-colors font-serif text-xl resize-none"
                placeholder="Tuliskan ucapan dan doa restu Anda untuk kedua mempelai"
              />
              {errors.message && (
                <p className="text-red-400 text-[10px] uppercase tracking-widest mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Mengirim..." : "Kirim Konfirmasi"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};
