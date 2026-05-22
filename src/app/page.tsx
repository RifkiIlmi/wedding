'use client'

import { useState, useEffect } from 'react'
import { OpeningScreen } from '@/components/invitation/OpeningScreen'
import { MusicPlayer } from '@/components/shared/MusicPlayer'
import { Hero } from '@/sections/Hero'
import { BrideGroom } from '@/sections/BrideGroom'
import { Countdown } from '@/sections/Countdown'
import { EventDetails } from '@/sections/EventDetails'
import { LoveStory } from '@/sections/LoveStory'
import { Gallery } from '@/sections/Gallery'
import { RSVP } from '@/sections/RSVP'
import { DigitalGift } from '@/sections/DigitalGift'
import { Wishes } from '@/sections/Wishes'
import { Footer } from '@/sections/Footer'

export default function Home() {
  const [isOpened, setIsOpened] = useState(false)
  const [guestName, setGuestName] = useState("Our Guest")

  useEffect(() => {
    // Lock scroll when not opened
    if (!isOpened) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Get guest name from URL params if available
    const params = new URLSearchParams(window.location.search)
    const to = params.get('to')
    if (to) {
      setGuestName(decodeURIComponent(to))
    }
  }, [isOpened])

  return (
    <main className="relative min-h-screen bg-primary">
      {/* 1. Opening Screen (Scroll locked) */}
      <OpeningScreen
        guestName={guestName}
        onOpen={() => setIsOpened(true)}
      />

      {/* Main Content (Revealed after opening) */}
      <div className={`${!isOpened ? 'h-screen overflow-hidden' : ''}`}>
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Rifki & Jeni Section */}
        <BrideGroom />

        {/* 4. Countdown Section */}
        <Countdown targetDate="2026-07-11T08:00:00" />

        {/* 5. Event Details Section */}
        <EventDetails />

        {/* 6. Love Story Timeline */}
        <LoveStory />

        {/* 7. Gallery Section */}
        <Gallery />

        {/* 8. RSVP Section */}
        <RSVP />

        {/* 9. Digital Gift Section */}
        <DigitalGift />

        {/* 10. Wishes Section */}
        <Wishes />

        {/* 11. Footer Section */}
        <Footer />
      </div>

      {/* Global Music Player */}
      {isOpened && (
        <MusicPlayer
          isPlaying={true}
          url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        />
      )}
    </main>
  )
}
