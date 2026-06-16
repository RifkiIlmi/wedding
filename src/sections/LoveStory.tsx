"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FloatingParticles } from "@/components/shared/FloatingParticles";
import { GoldSparkle } from "@/components/shared/GoldSparkle";

interface StoryItemProps {
  year: string;
  title: string;
  description: string;
  image: string;
  index: number;
}

const StoryItem = ({ year, title, description, image, index }: StoryItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInCenter = useInView(ref, { margin: "-40% 0px -40% 0px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 * index }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-12 md:mb-16 group ${isEven ? "md:flex-row" : "md:flex-row-reverse"
        }`}
    >
      {/* Date/Year on the opposite side (Desktop only) */}
      <div className={`hidden md:flex w-[44%] items-center ${isEven ? "justify-end text-right" : "justify-start text-left"}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col gap-1"
        >
          <span className="font-serif text-3xl lg:text-4xl text-gradient-gold font-light tracking-wide">
            {year}
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-dark/40">
            Chapter {index + 1}
          </span>
        </motion.div>
      </div>

      {/* Center Line Node */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-primary border border-gold/40 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:border-gold transition-all duration-500">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold-dark shadow-[0_0_8px_rgba(212,175,55,0.4)] group-hover:scale-125 transition-transform duration-500" />
        </div>
      </div>

      {/* Card Content */}
      <div className="w-full md:w-[44%] pl-12 md:pl-0">
        <div className="bg-white/95 p-5 md:p-6 rounded-[24px] shadow-xl hover:shadow-2xl border border-gold/10 hover:border-gold/30 transition-all duration-500 relative overflow-hidden holo-card flex flex-col gap-4">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent opacity-60 pointer-events-none" />

          {/* Mobile Date Header */}
          <div className="block md:hidden">
            <span className="text-gold font-serif text-lg font-medium tracking-wide">
              {year}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.15em] text-dark/40 mt-0.5">
              Chapter {index + 1}
            </span>
          </div>

          {/* Image Container */}
          <div className="relative w-full h-40 md:h-44 rounded-xl overflow-hidden shadow-inner shrink-0 bg-dark/5">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className={`object-cover transition-all duration-700 ease-in-out transform group-hover:scale-105 ${isInCenter ? "grayscale-0" : "grayscale"
                } md:grayscale md:group-hover:grayscale-0`}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-gold/15 rounded-xl pointer-events-none" />
          </div>

          {/* Text Content */}
          <div className="relative z-10">
            <h3 className="font-serif text-2xl mb-2 text-dark group-hover:text-gold-dark transition-colors duration-500">
              {title}
            </h3>
            <p className="font-sans text-xs md:text-sm text-dark/75 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const LoveStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const stories = [
    {
      year: "2019",
      title: "First Meeting",
      description:
        "Kami pertama kali bertemu di organisasi kampus Puzzle Research Data Technology. Sebuah pertemuan sederhana yang menjadi awal kisah kami.",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
    },
    {
      year: "2022",
      title: "A Beautiful Beginning",
      description:
        "Takdir kembali mempertemukan kami melalui kantor yang berdekatan di Jalan Sudirman, Pekanbaru, Riau. Dari makan siang bersama hingga berbagi cerita, kedekatan itu tumbuh menjadi cinta.",
      image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=800&auto=format&fit=crop",
    },
    {
      year: "2024",
      title: "Growing Through Distance",
      description:
        "Jarak dan kesibukan membawa kami menempuh jalan masing-masing. Meski sempat kehilangan kontak, takdir masih menyimpan cerita untuk kami.",
      image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=800&auto=format&fit=crop",
    },
    {
      year: "February 2026",
      title: "Engagement",
      description:
        "SSetelah perjalanan panjang, kami dipertemukan kembali dan memutuskan untuk melangkah bersama menuju masa depan.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop",
    },
    {
      year: "July 2026",
      title: "Wedding Day",
      description:
        "Dengan penuh syukur, kami siap mengikat janji suci pernikahan dan memulai babak baru sebagai pasangan seumur hidup.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section id="story" className="py-24 md:py-36 bg-primary overflow-hidden relative">
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
        <div className="text-center mb-20 md:mb-28 relative">
          <GoldSparkle size={24} className="absolute -top-4 left-10" />
          <GoldSparkle size={18} className="absolute top-6 right-12" />
          <h2 className="font-serif text-5xl md:text-6xl text-dark mb-4 tracking-tight text-shadow">
            Our Love Story
          </h2>
          <div className="w-24 h-px bg-gold mx-auto mb-6 shimmer-line" />
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold/60 italic">
            How it all began
          </p>
        </div>

        <div ref={containerRef} className="relative wrap overflow-hidden p-0 md:p-10 min-h-[500px]">
          {/* Static background line */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-[2px] bg-gold/10 -translate-x-1/2" />

          {/* Animated drawing line */}
          <motion.div
            className="absolute top-0 left-6 md:left-1/2 w-[2px] bg-gradient-to-b from-gold/30 via-gold to-gold/30 -translate-x-1/2 shadow-[0_0_10px_rgba(212,175,55,0.4)]"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col gap-2 md:gap-0">
            {stories.map((story, index) => (
              <StoryItem key={story.year} {...story} index={index} />
            ))}
          </div>

          {/* Final Reveal: Overlapping Rings & Quote */}
          <div className="relative z-30 mt-16 md:mt-24 flex flex-col items-center justify-center pb-12">
            <div className="relative flex items-center justify-center w-full h-20">
              {/* Left Ring */}
              <motion.div
                initial={{ x: -60, opacity: 0 }}
                whileInView={{ x: -14, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                viewport={{ once: true, margin: "-20% 0px" }}
                className="absolute"
              >
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="28" stroke="#D4AF37" strokeWidth="1.5" className="drop-shadow-sm" />
                </svg>
              </motion.div>

              {/* Right Ring */}
              <motion.div
                initial={{ x: 60, opacity: 0 }}
                whileInView={{ x: 14, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                viewport={{ once: true, margin: "-20% 0px" }}
                className="absolute"
              >
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="28" stroke="#D4AF37" strokeWidth="1.5" className="drop-shadow-sm" />
                </svg>
              </motion.div>
            </div>

            {/* Quote */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
              viewport={{ once: true, margin: "-20% 0px" }}
              className="mt-8 font-serif text-2xl md:text-3xl text-dark/80 italic tracking-wide text-center max-w-lg px-4 leading-relaxed"
            >
              &quot;And so together, they built a life they loved.&quot;
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};
