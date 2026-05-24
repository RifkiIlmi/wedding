'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
      <audio
        ref={audioRef}
        src={url}
        loop
        autoPlay={initialPlay}
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />

      <motion.button
        type="button"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
        transition={isPlaying ? { duration: 4, repeat: Infinity, ease: 'linear' } : { duration: 0.2 }}
        onClick={togglePlay}
        className={`relative flex h-12 w-12 items-center justify-center rounded-full shadow-2xl transition-colors duration-300 ${
          isPlaying ? 'bg-gold text-primary' : 'border border-gold/30 bg-white text-gold'
        }`}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5" />}

        <AnimatePresence>
          {isPlaying && (
            <>
              <motion.span
                aria-hidden="true"
                initial={{ scale: 1, opacity: 0.45 }}
                animate={{ scale: 1.6, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 -z-10 rounded-full bg-gold"
              />
              <motion.span
                aria-hidden="true"
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.45 }}
                className="absolute inset-0 -z-10 rounded-full bg-gold"
              />
            </>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
