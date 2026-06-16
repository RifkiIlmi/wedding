'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export const MusicPlayer = ({ isPlaying: initialPlay = false, url }: { isPlaying?: boolean; url: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const playWithFadeIn = (audio: HTMLAudioElement) => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current)
    }

    audio.volume = 0
    audio.play()
      .then(() => {
        setIsPlaying(true)
        const targetVolume = 0.8
        const duration = 2000 // 2 seconds
        const step = targetVolume / (duration / 50)

        fadeIntervalRef.current = setInterval(() => {
          if (audio.volume < targetVolume) {
            audio.volume = Math.min(targetVolume, audio.volume + step)
          } else {
            if (fadeIntervalRef.current) {
              clearInterval(fadeIntervalRef.current)
              fadeIntervalRef.current = null
            }
          }
        }, 50)
      })
      .catch((err) => {
        console.warn("Audio play blocked/failed", err)
        setIsPlaying(false)
      })
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (initialPlay) {
      playWithFadeIn(audio)
    } else {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
        fadeIntervalRef.current = null
      }
      audio.pause()
      setIsPlaying(false)
    }
  }, [initialPlay])

  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
        fadeIntervalRef.current = null
      }
      audio.pause()
      setIsPlaying(false)
    } else {
      playWithFadeIn(audio)
    }
  }

  return (
    <div className="fixed bottom-24 right-6 sm:bottom-6 sm:right-6 z-[80]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wave-bar-1 {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        @keyframes wave-bar-2 {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
        @keyframes wave-bar-3 {
          0%, 100% { height: 4px; }
          50% { height: 18px; }
        }
        @keyframes wave-bar-4 {
          0%, 100% { height: 4px; }
          50% { height: 10px; }
        }
        .animate-wave-1 { animation: wave-bar-1 1s ease-in-out infinite; }
        .animate-wave-2 { animation: wave-bar-2 0.8s ease-in-out infinite; }
        .animate-wave-3 { animation: wave-bar-3 1.2s ease-in-out infinite; }
        .animate-wave-4 { animation: wave-bar-4 0.9s ease-in-out infinite; }
      `}} />

      <audio
        ref={audioRef}
        src={url}
        loop
        preload="none"
        className="hidden"
      />

      <motion.button
        type="button"
        aria-label={isPlaying ? 'Mute music' : 'Play music'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-primary/20 hover:bg-gold/10 text-gold backdrop-blur-md shadow-lg transition-all duration-300"
      >
        <div className="flex items-end justify-center gap-[3px] h-4 w-5">
          <span className={`w-[2px] bg-gold rounded-full transition-all duration-300 ${isPlaying ? 'animate-wave-1' : 'h-[4px]'}`} />
          <span className={`w-[2px] bg-gold rounded-full transition-all duration-300 ${isPlaying ? 'animate-wave-2' : 'h-[4px]'}`} />
          <span className={`w-[2px] bg-gold rounded-full transition-all duration-300 ${isPlaying ? 'animate-wave-3' : 'h-[4px]'}`} />
          <span className={`w-[2px] bg-gold rounded-full transition-all duration-300 ${isPlaying ? 'animate-wave-4' : 'h-[4px]'}`} />
        </div>
      </motion.button>
    </div>
  )
}

