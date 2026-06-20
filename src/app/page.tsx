"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { OpeningScreen } from "@/components/invitation/OpeningScreen";
import { MusicPlayer } from "@/components/shared/MusicPlayer";
import { FloatingDock } from "@/components/shared/FloatingDock";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/sections/Hero").then((mod) => mod.Hero), { ssr: true });
const BrideGroom = dynamic(() => import("@/sections/BrideGroom").then((mod) => mod.BrideGroom), { ssr: false });
const Countdown = dynamic(() => import("@/sections/Countdown").then((mod) => mod.Countdown), { ssr: false });
const EventDetails = dynamic(() => import("@/sections/EventDetails").then((mod) => mod.EventDetails), { ssr: false });
const LoveStory = dynamic(() => import("@/sections/LoveStory").then((mod) => mod.LoveStory), { ssr: false });
const Gallery = dynamic(() => import("@/sections/Gallery").then((mod) => mod.Gallery), { ssr: false });
const RSVP = dynamic(() => import("@/sections/RSVP").then((mod) => mod.RSVP), { ssr: false });
const DigitalGift = dynamic(() => import("@/sections/DigitalGift").then((mod) => mod.DigitalGift), { ssr: false });
const Wishes = dynamic(() => import("@/sections/Wishes").then((mod) => mod.Wishes), { ssr: false });
const FAQ = dynamic(() => import("@/sections/FAQ").then((mod) => mod.FAQ), { ssr: false });
const Footer = dynamic(() => import("@/sections/Footer").then((mod) => mod.Footer), { ssr: false });

function LazySection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "250px" });
  return (
    <div ref={ref} className="w-full">
      {isInView ? children : <div className="h-40" />}
    </div>
  );
}

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [guestName, setGuestName] = useState("Tamu Undangan");

  useEffect(() => {
    // Lock scroll when not opened
    if (!isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Get guest name from URL params if available
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) {
      setGuestName(decodeURIComponent(to));
    }
  }, [isOpened]);

  return (
    <main className="relative min-h-screen bg-dark">
      {/* 1. Opening Screen (Scroll locked) */}
      <OpeningScreen guestName={guestName} onOpen={() => setIsOpened(true)} />

      {/* Main Content (Revealed and mounted after opening) */}
      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* 2. Hero Section */}
          <Hero />

          {/* 3. Rifki & Jeni Section */}
          <BrideGroom />

          {/* 4. Countdown Section */}
          <Countdown targetDate="2026-07-11T08:00:00" />

          {/* 5. Event Details Section */}
          <EventDetails />

          {/* 6. Love Story Timeline */}
          <LazySection>
            <LoveStory />
          </LazySection>

          {/* 7. Gallery Section */}
          <LazySection>
            <Gallery />
          </LazySection>

          {/* 8. RSVP Section */}
          <LazySection>
            <RSVP />
          </LazySection>

          {/* 9. Digital Gift Section */}
          <LazySection>
            <DigitalGift />
          </LazySection>

          {/* 10. Wishes Section */}
          <LazySection>
            <Wishes />
          </LazySection>

          {/* 10.5. FAQ Section */}
          <LazySection>
            <FAQ />
          </LazySection>

          {/* 11. Footer Section */}
          <LazySection>
            <Footer />
          </LazySection>
          {/* Floating Dock Navigation */}
          <FloatingDock />
        </motion.div>
      )}

      {/* Global Music Player */}
      <MusicPlayer
        isPlaying={isOpened}
        url="/assets/audio/bg-music.mp3"
      />
    </main>
  );
}
