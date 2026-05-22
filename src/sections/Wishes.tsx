'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

interface Wish {
  id: string
  name: string
  message: string
  created_at: string
}

export const Wishes = () => {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWishes = async () => {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      if (!error && data) {
        setWishes(data)
      }
      setLoading(false)
    }

    fetchWishes()

    // Realtime subscription
    const channel = supabase
      .channel('wishes-channel')
      .on('postgres_changes', { event: 'INSERT', table: 'wishes' }, (payload) => {
        setWishes((prev) => [payload.new as Wish, ...prev])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  if (loading) return null

  return (
    <section className="py-24 md:py-32 bg-secondary/10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-dark mb-6 tracking-tight">Wishes</h2>
          <div className="w-24 h-px bg-gold mx-auto mb-8" />
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold/60 italic">Kind words from loved ones</p>
        </div>

        <div className="max-w-4xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
                {wishes.map((wish, index) => (
                    <motion.div
                        key={wish.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-sm shadow-lg border-l-4 border-gold relative"
                    >
                        <div className="absolute top-4 right-6 opacity-5 font-serif text-6xl">"</div>
                        <h4 className="font-serif text-xl text-dark mb-4">{wish.name}</h4>
                        <p className="font-sans text-sm text-dark/60 leading-relaxed italic">
                            "{wish.message}"
                        </p>
                    </motion.div>
                ))}
            </div>

            {wishes.length === 0 && (
                <p className="text-center font-sans text-dark/40 italic">Be the first to leave a wish!</p>
            )}
        </div>
      </div>
    </section>
  )
}
