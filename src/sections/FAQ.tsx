"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { GoldSparkle } from "@/components/shared/GoldSparkle";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Dress Code & Panduan Busana?",
    answer: "Untuk menyelaraskan keindahan momen bahagia kami, para tamu undangan disarankan mengenakan pakaian bertema pastel lembut, cream, atau monokrom yang elegan. Hindari pakaian berbahan jeans atau kaos santai.",
  },
  {
    question: "Lokasi Parkir & Layanan Valet?",
    answer: "Area parkir yang luas dan aman telah disediakan secara eksklusif bagi para tamu undangan di area gedung acara. Layanan valet gratis juga tersedia di lobi utama untuk kenyamanan Anda.",
  },
  {
    question: "Kebijakan Membawa Anak-Anak?",
    answer: "Kami menyukai anak-anak, namun demi kenyamanan jalannya ritual pernikahan dan keterbatasan kapasitas, kami menyarankan pendampingan ekstra bagi anak-anak agar suasana tetap khidmat.",
  },
  {
    question: "Protokol Kesehatan & Kebersihan?",
    answer: "Kenyamanan dan keselamatan Anda adalah prioritas kami. Hand sanitizer disediakan di beberapa titik strategis, dan seluruh area acara disterilisasi sebelum acara berlangsung.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-32 md:py-48 bg-primary overflow-hidden relative border-t border-gold/10">
      <style dangerouslySetInnerHTML={{ __html: `
        details[open] summary ~ * {
          animation: slideDown 0.4s ease-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-24 relative">
          <GoldSparkle size={18} className="absolute -top-4 left-1/3" />
          <GoldSparkle size={12} className="absolute top-4 right-1/3" />
          <h2 className="font-serif text-5xl md:text-6xl text-dark mb-6 tracking-tight text-shimmer-gold">
            Informasi Tamu
          </h2>
          <div className="w-24 h-px bg-gold/30 mx-auto mb-8 shimmer-line" />
          <p className="font-sans text-sm text-dark/60 tracking-[0.3em] uppercase italic">
            F.A.Q & Panduan Penting Acara
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-b border-gold/15 last:border-0"
            >
              <details className="group py-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-serif text-lg md:text-xl text-dark hover:text-gold-dark transition-colors duration-300 select-none">
                  <span className="tracking-wide">{item.question}</span>
                  <span className="text-gold/60 transition-transform duration-500 group-open:rotate-45">
                    <Plus className="w-4 h-4" />
                  </span>
                </summary>
                <div className="mt-4 font-sans text-sm md:text-base text-dark/70 leading-relaxed max-w-3xl pr-8">
                  {item.answer}
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
