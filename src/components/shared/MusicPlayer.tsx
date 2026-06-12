'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Music, Pause } from 'lucide-react'

export const MusicPlayer = ({ isPlaying: initialPlay = false, url }: { isPlaying?: boolean; url: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    if (initialPlay) {
      audio.play().catch(() => {
        // Browser may block autoplay until the invitation open click is registered.
      })
    } else {
      audio.pause()
    }
  }, [initialPlay])

  const togglePlay = () => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
  }

  return (
    <div className="fixed bottom-6 right-6 z-[80]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }
      `}} />

      <audio
        ref={audioRef}
        src={url}
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />

      <motion.button
        type="button"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className={`relative flex h-12 w-12 items-center justify-center rounded-full shadow-2xl transition-all duration-300 ${
          isPlaying ? 'bg-gold text-primary animate-spin-slow' : 'border border-gold/30 bg-white text-gold'
        }`}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5" />}

        {isPlaying && (
          <span className="absolute inset-0 -z-10 rounded-full bg-gold/40 animate-ping" />
        )}
      </motion.button>
    </div>
  )
}

