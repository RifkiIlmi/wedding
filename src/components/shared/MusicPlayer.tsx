"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause } from "lucide-react";

export const MusicPlayer = ({
  isPlaying: initialPlay = false,
  url,
}: {
  isPlaying?: boolean;
  url: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(initialPlay);
  const audioRef = useRef<HTMLAudioElement>(null);
  const spotifyTrackId =
    url.match(
      /(?:spotify\.com\/embed\/track\/|spotify\.com\/track\/|spotify:track:)([A-Za-z0-9]+)/,
    )?.[1] ?? null;
  const isSpotify = Boolean(spotifyTrackId);

  useEffect(() => {
    if (!isSpotify && initialPlay && audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.log("Autoplay blocked", err));
      setIsPlaying(true);
    }
  }, [initialPlay, isSpotify]);

  const togglePlay = () => {
    if (isSpotify) {
      setIsPlaying((state) => !state);
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-80 flex flex-col items-end gap-3">
      {isSpotify && isPlaying && (
        <div className="w-[320px] h-88 rounded-[28px] overflow-hidden border border-gold/20 shadow-2xl bg-slate-950/95">
          <iframe
            title="Spotify music player"
            src={`https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator`}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="w-full h-full"
          />
        </div>
      )}

      {!isSpotify && <audio ref={audioRef} src={url} loop />}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isPlaying
            ? "bg-gold text-primary rotate-music"
            : "bg-white text-gold border border-gold/20"
        }`}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Music className="w-5 h-5" />
        )}

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
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .rotate-music {
          animation: rotate-music 4s linear infinite;
        }
      `}</style>
    </div>
  );
};
