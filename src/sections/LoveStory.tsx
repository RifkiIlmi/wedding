"use client";

import { motion } from "framer-motion";
import { FloatingParticles } from "@/components/shared/FloatingParticles";
import { GoldSparkle } from "@/components/shared/GoldSparkle";

interface StoryItemProps {
  year: string;
  title: string;
  description: string;
  index: number;
}

const StoryItem = ({ year, title, description, index }: StoryItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.15 * index }}
    viewport={{ once: true }}
    className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-12 md:mb-16 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} `}
  >
    <div className="absolute left-0 top-8 w-3 h-3 rounded-full bg-gold/90 shadow-[0_0_18px_rgba(212,175,55,0.35)] animate-sparkle" />
    <div className="absolute right-10 bottom-8 w-2 h-2 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.3)] animate-sparkle delay-150" />
    <div className="hidden md:block w-5/12" />

    <div className="relative z-20 flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border-4 border-gold shadow-[0_0_30px_rgba(212,175,55,0.18)] mb-4 md:mb-0 shrink-0 pulse-glow">
      <span className="text-dark text-xs font-semibold tracking-[0.24em] uppercase">
        {year}
      </span>
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
    </div>

    <div className="w-full md:w-5/12 bg-white/90 p-6 md:p-8 rounded-[28px] shadow-2xl border border-gold/10 hover:border-gold/20 transition-colors relative overflow-hidden holo-card">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-gold/5 to-transparent opacity-80 pointer-events-none" />
      <div className="relative z-10">
        <h3 className="font-serif text-3xl mb-4 text-dark text-shadow">
          {title}
        </h3>
        <p className="font-sans text-sm text-dark/70 leading-relaxed italic">
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

export const LoveStory = () => {
  const stories = [
    {
      year: "2020",
      title: "Pertemuan Pertama",
      description:
        "Pertemuan tak sengaja di toko buku lokal yang mengubah hidup kami selamanya. Kami mengobrol berjam-jam tentang apa saja.",
    },
    {
      year: "2022",
      title: "Lamaran",
      description:
        "Di bawah langit Paris yang bertabur bintang, di tepi Sungai Seine, dia melamar dan dia menjawab ya dengan air mata kebahagiaan.",
    },
    {
      year: "2026",
      title: "Menuju Selamanya",
      description:
        "Kini kami berdiri di ambang perjalanan baru, siap untuk mengikrarkan janji suci dan membangun kehidupan bersama.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-primary overflow-hidden relative">
      <FloatingParticles
        count={28}
        color="#D4AF3780"
        speed={0.25}
        maxSize={4}
        minSize={1.2}
        opacity={0.4}
        className="opacity-80"
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="bokeh-circle w-40 h-40 left-10 top-12 opacity-70" />
        <div className="bokeh-circle w-32 h-32 right-10 top-24 opacity-50" />
        <div className="bokeh-circle w-48 h-48 left-1/2 top-28 -translate-x-1/2 opacity-30" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-24 relative">
          <GoldSparkle size={24} className="absolute -top-4 left-10" />
          <GoldSparkle size={18} className="absolute top-6 right-12" />
          <h2 className="font-serif text-5xl md:text-6xl text-dark mb-4 tracking-tight text-shadow">
            Our Love Story
          </h2>
          <div className="w-24 h-px bg-gold mx-auto mb-8 shimmer-line" />
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold/60 italic">
            How it all began
          </p>
        </div>

        <div className="relative wrap overflow-hidden p-8 md:p-10">
          <div className="absolute top-0 left-1/2 h-full w-px bg-gold/20 -translate-x-1/2" />

          {stories.map((story, index) => (
            <StoryItem key={story.year} {...story} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
