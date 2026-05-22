'use client'

import { motion } from 'framer-motion'

const images = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519225495810-758b63300051?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80"
]

export const Gallery = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl text-dark mb-6 tracking-tight">Gallery</h2>
          <div className="w-24 h-px bg-gold mx-auto mb-8" />
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold/60">Captured Moments</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-sm group cursor-pointer aspect-[3/4] ${
                index === 1 || index === 4 ? 'md:aspect-square' : ''
              }`}
            >
              <img 
                src={img} 
                alt={`Wedding moment ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                 <span className="text-primary font-serif italic text-xl">View Details</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
