"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingParticles } from "@/components/shared/FloatingParticles";
import { GoldSparkle } from "@/components/shared/GoldSparkle";

const EventCard = ({
  title,
  date,
  time,
  venue,
  address,
  mapUrl,
  isAkad,
}: any) => (
  <motion.div
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
    viewport={{ once: true }}
    whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
    className="bg-white p-8 md:p-12 border border-gold/10 shadow-2xl relative overflow-hidden group holo-card"
  >
    {/* Animated ornamental corners */}
    <div className="absolute top-4 left-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-700">
      <div className="absolute top-0 left-0 w-full h-px bg-gold/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      <div className="absolute top-0 left-0 h-full w-px bg-gold/40 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
    </div>
    <div className="absolute top-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-700">
      <div className="absolute top-0 right-0 w-full h-px bg-gold/40 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      <div className="absolute top-0 right-0 h-full w-px bg-gold/40 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
    </div>
    <div className="absolute bottom-4 left-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-700">
      <div className="absolute bottom-0 left-0 w-full h-px bg-gold/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
      <div className="absolute bottom-0 left-0 h-full w-px bg-gold/40 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100" />
    </div>
    <div className="absolute bottom-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-700">
      <div className="absolute bottom-0 right-0 w-full h-px bg-gold/40 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
      <div className="absolute bottom-0 right-0 h-full w-px bg-gold/40 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100" />
    </div>

    {/* Shimmer sweep overlay */}
    <div className="absolute inset-0 shimmer-line opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    <div className="flex flex-col items-center text-center relative z-10">
      <div className="w-16 h-16 rounded-full border border-gold flex items-center justify-center mb-8 glow-gold">
        <Calendar className="w-6 h-6 text-gold" />
      </div>

      <h3 className="font-serif text-3xl md:text-4xl mb-6 text-dark tracking-wide">
        {title}
      </h3>

      <div className="w-16 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent mb-8" />

      <div className="space-y-6 mb-10 w-full">
        <div className="flex items-center justify-center gap-4 text-dark/70">
          <Calendar className="w-5 h-5 text-gold/60" />
          <p className="font-sans text-lg tracking-wide">{date}</p>
        </div>

        <div className="flex items-center justify-center gap-4 text-dark/70">
          <Clock className="w-5 h-5 text-gold/60" />
          <p className="font-sans text-lg tracking-wide">{time}</p>
        </div>

        <div className="flex flex-col items-center gap-3 text-dark/70">
          <div className="flex items-center gap-4">
            <MapPin className="w-5 h-5 text-gold/60" />
            <p className="font-serif text-xl text-dark tracking-wide">
              {venue}
            </p>
          </div>
          <p className="font-sans text-sm text-dark/50 max-w-xs">{address}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={() => window.open(mapUrl, "_blank")}
        >
          <MapPin className="w-4 h-4" />
          Google Maps
        </Button>
      </div>
    </div>
  </motion.div>
);

export const EventDetails = () => {
  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
      {/* Particles */}
      <FloatingParticles count={18} speed={0.12} opacity={0.12} maxSize={1.8} />

      {/* Background ornament */}
      <div className="absolute inset-0 pattern-ornament pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-20 relative">
          <GoldSparkle
            size={14}
            className="absolute left-10 top-8 opacity-70"
          />
          <GoldSparkle
            size={12}
            className="absolute right-12 top-6 opacity-60"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-sans text-xs uppercase tracking-[0.4em] text-gold mb-4"
          >
            Save The Date
          </motion.p>
          <h2 className="font-serif text-5xl md:text-6xl text-dark mb-6 tracking-tight">
            Informasi Acara
          </h2>
          <div className="w-24 h-px bg-linear-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        {/* Animated decorative line between cards */}
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: 200 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              viewport={{ once: true }}
              className="w-px bg-linear-to-b from-transparent via-gold/30 to-transparent"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 relative z-10">
            <EventCard
              title="Akad Pernikahan"
              date="Jum'at, 10 Juli 2026"
              time="19:00 PM - 21:00 PM"
              venue="St. Patrick Cathedral"
              address="123 Wedding Street, New York, NY 10001"
              mapUrl="https://maps.google.com"
              isAkad={true}
            />
            <EventCard
              title="Resepsi Pernikahan"
              date="Minggu, 20 Desember 2026"
              time="01:00 PM - 04:00 PM"
              venue="The Grand Ballroom"
              address="456 Luxury Ave, New York, NY 10002"
              mapUrl="https://maps.google.com"
              isAkad={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
