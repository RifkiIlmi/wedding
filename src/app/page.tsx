"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { OpeningScreen } from "@/components/invitation/OpeningScreen";
import { MusicPlayer } from "@/components/shared/MusicPlayer";
import { Hero } from "@/sections/Hero";
import { BrideGroom } from "@/sections/BrideGroom";
import { Countdown } from "@/sections/Countdown";
import { EventDetails } from "@/sections/EventDetails";
import { LoveStory } from "@/sections/LoveStory";
import { Gallery } from "@/sections/Gallery";
import { RSVP } from "@/sections/RSVP";
import { DigitalGift } from "@/sections/DigitalGift";
import { Wishes } from "@/sections/Wishes";
import { FAQ } from "@/sections/FAQ";
import { Footer } from "@/sections/Footer";

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
    <main className="relative min-h-screen bg-primary">
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
        </motion.div>
      )}

      {/* Global Music Player */}
      <MusicPlayer
        isPlaying={isOpened}
        url="https://archive.org/download/payung-teduh-akad-official-music-video-payung-teduh-official/Payung%20Teduh%20-%20Akad%20%28Official%20Music%20Video%29%20-%20Payung%20Teduh%20Official.mp3"
      />
    </main>
  );
}
