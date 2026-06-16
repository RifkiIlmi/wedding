"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Clock, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingParticles } from "@/components/shared/FloatingParticles";
import { GoldSparkle } from "@/components/shared/GoldSparkle";

const eventsData = [
  {
    id: "akad",
    tabLabel: "Akad",
    title: "Akad Pernikahan",
    date: "Jum'at, 10 Juli 2026",
    time: "19:00 - 21:00 WIB",
    venue: "Kediaman Wanita",
    address: "Kayu Ara, Kec. Kerumutan, Kab. Pelalawan, Riau",
    coordinate: "-0.061144881064984176, 102.30936620709",
    startUtc: "20260710T120000Z",
    endUtc: "20260710T140000Z"
  },
  {
    id: "resepsi",
    tabLabel: "Resepsi",
    title: "Resepsi Pernikahan",
    date: "Sabtu, 11 Juli 2026",
    time: "09:00 - 21:00 WIB",
    venue: "Kediaman Wanita",
    address: "Kayu Ara, Kec. Kerumutan, Kab. Pelalawan, Riau",
    coordinate: "-0.061144881064984176, 102.30936620709",
    startUtc: "20260711T020000Z",
    endUtc: "20260711T140000Z"
  },
  {
    id: "ngunduh",
    tabLabel: "Ngunduh Mantu",
    title: "Ngunduh Mantu",
    date: "Sabtu, 18 Juli 2026",
    time: "11:00 WIB - Selesai",
    venue: "Kediaman Pria",
    address: "Jl. Taruna I, Lembah Sari, Kec. Rumbai Pesisir, Kota Pekanbaru",
    coordinate: "0.5683243759906498, 101.46949582490055",
    startUtc: "20260718T040000Z",
    endUtc: "20260718T080000Z"
  }
];

const TabContent = ({ event, onOpenMap }: any) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleCalendarClick = (provider: string) => {
    setIsCalendarOpen(false);

    if (provider === "Google Calendar") {
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title + " Jeni & Rifki")}&dates=${event.startUtc}/${event.endUtc}&details=${encodeURIComponent("Acara " + event.title + " Jeni & Rifki")}&location=${encodeURIComponent(event.address)}`;
      window.open(url, "_blank");
    } else {
      // Apple Calendar & Outlook use .ics
      const icsData = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
DTSTART:${event.startUtc}
DTEND:${event.endUtc}
SUMMARY:"${event.title} Jeni & Rifki"
DESCRIPTION:Acara "${event.title} Jeni & Rifki"
LOCATION:${event.address}
END:VEVENT
END:VCALENDAR`;

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center text-center max-w-xl mx-auto pt-16 pb-8 px-4"
    >
      <h3 className="font-serif text-4xl md:text-5xl mb-12 text-dark tracking-wide">
        {event.title}
      </h3>

      <div className="space-y-8 mb-16 w-full">
        <div className="flex flex-col items-center gap-3">
          <p className="font-sans text-xl md:text-2xl font-light text-dark/80 tracking-widest">{event.date}</p>
          <p className="font-sans text-sm md:text-base font-light text-dark/50 tracking-[0.2em]">{event.time}</p>
        </div>

        <div className="w-px h-12 bg-linear-to-b from-transparent via-gold/40 to-transparent mx-auto my-8" />

        <div className="flex flex-col items-center gap-3">
          <p className="font-serif text-2xl text-dark tracking-wide">{event.venue}</p>
          <p className="font-sans text-sm font-light text-dark/50 tracking-wider max-w-sm leading-relaxed">{event.address}</p>
        </div>
      </div>

      <div className="flex flex-col gap-5 w-full max-w-xs mx-auto">
        {/* Add to Calendar Dropdown */}
        <div className="relative w-full">
          <button
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="w-full py-3 border border-gold/50 text-dark font-sans text-xs uppercase tracking-[0.3em] hover:bg-gold/5 transition-colors flex items-center justify-center gap-2"
          >
            SAVE THE DATE
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCalendarOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {isCalendarOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 w-full mt-2 bg-white border border-gold/20 shadow-xl z-20 overflow-hidden rounded-md"
              >
                {["Apple Calendar", "Google Calendar", "Outlook"].map((provider) => (
                  <button
                    key={provider}
                    className="w-full py-3 text-sm text-dark hover:bg-gold/10 transition-colors text-center block"
                    onClick={() => handleCalendarClick(provider)}
                  >
                    {provider}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View Location Button */}
        <button
          onClick={onOpenMap}
          className="w-full py-3 bg-dark text-white font-sans text-sm uppercase tracking-widest hover:bg-gold-dark transition-colors"
        >
          Lihat Peta Lokasi
        </button>
      </div>
    </motion.div>
  );
};

export const EventDetails = () => {
  const [activeTab, setActiveTab] = useState("akad");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeEvent = eventsData.find(e => e.id === activeTab);

  return (
    <section id="event" className="py-32 md:py-48 bg-primary relative overflow-hidden">
      {/* Background ornament */}
      <div className="absolute inset-0 pattern-ornament pointer-events-none opacity-50" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16 relative">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-xs uppercase tracking-[0.4em] text-gold mb-4"
          >
            Rangkaian Acara
          </motion.p>
          <h2 className="font-serif text-5xl md:text-6xl text-dark tracking-tight">
            Event Details
          </h2>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-4 relative z-20">
          <div className="flex gap-6 md:gap-16 border-b border-gold/20 pb-4">
            {eventsData.map((event) => (
              <button
                key={event.id}
                onClick={() => setActiveTab(event.id)}
                className={`relative pb-2 font-sans text-xs md:text-sm uppercase tracking-[0.2em] transition-colors duration-300 ${activeTab === event.id ? "text-gold-dark font-medium" : "text-dark/40 hover:text-dark/70 font-light"
                  }`}
              >
                {event.tabLabel}
                {activeTab === event.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-gold"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeEvent && <TabContent key={activeEvent.id} event={activeEvent} onOpenMap={() => setIsModalOpen(true)} />}
          </AnimatePresence>
        </div>
      </div>

      {/* Map Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 sm:p-4 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 bg-dark/40 hover:bg-dark/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full aspect-[4/3] sm:aspect-video md:aspect-[21/9] rounded-xl overflow-hidden bg-white/5 relative mt-12 sm:mt-0">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(activeEvent?.coordinate || activeEvent?.address || "Riau")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
