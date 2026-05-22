'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Pause, Play } from 'lucide-react'

export const MusicPlayer = ({ isPlaying: initialPlay = false, url }: { isPlaying?: boolean; url: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (initialPlay && audioRef.current) {
        audioRef.current.play().catch(err => console.log("Autoplay blocked"))
        setIsPlaying(true)
    }
  }, [initialPlay])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[80]">
      <audio ref={audioRef} src={url} loop />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isPlaying ? 'bg-gold text-primary rotate-music' : 'bg-white text-gold border border-gold/20'
        }`}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Music className="w-5 h-5" />
        )}

        {/* Animated Rings when playing */}
        <AnimatePresence>
          {isPlaying && (
            <>
              <motion.div 
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-gold -z-10"
              />
              <motion.div 
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 rounded-full bg-gold -z-10"
              />
            </>
          )}
        </AnimatePresence>
      </motion.button>

      <style jsx global>{`
        @keyframes rotate-music {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .rotate-music {
          animation: rotate-music 4s linear infinite;
        }
      `}</style>
    </div>
  )
}
