'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Clock, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

const EventCard = ({ title, date, time, venue, address, mapUrl, isAkad }: any) => (
  <motion.div 
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="bg-white p-8 md:p-12 border border-gold/10 shadow-2xl relative overflow-hidden group"
  >
    {/* Decorative corner */}
    <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-gold/20 -translate-y-1/2 translate-x-1/2 group-hover:translate-x-1/3 group-hover:-translate-y-1/3 transition-transform duration-500" />

    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full border border-gold flex items-center justify-center mb-8">
         <Calendar className="w-6 h-6 text-gold" />
      </div>

      <h3 className="font-serif text-3xl md:text-4xl mb-6 text-dark tracking-wide">{title}</h3>
      
      <div className="w-16 h-px bg-gold/30 mb-8" />

      <div className="space-y-6 mb-10 w-full">
        <div className="flex items-center justify-center gap-4 text-dark/70">
           <Calendar className="w-5 h-5 text-gold/60" />
           <p className="font-sans text-lg tracking-wide">{date}</p>
        </div>
        
        <div className="flex items-center justify-center gap-4 text-dark/70">
           <Clock className="w-5 h-5 text-gold/60" />
           <p className="font-sans text-lg tracking-wide">{time}</p>
        </div>

        <div className="flex flex-col items-center gap-3 text-dark/70">
           <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-gold/60" />
              <p className="font-serif text-xl text-dark tracking-wide">{venue}</p>
           </div>
           <p className="font-sans text-sm text-dark/50 max-w-xs">{address}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={() => window.open(mapUrl, '_blank')}
        >
            <MapPin className="w-4 h-4" />
            Google Maps
        </Button>
        <Button className="w-full">
            Add to Calendar
        </Button>
      </div>
    </div>
  </motion.div>
)

export const EventDetails = () => {
  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="font-sans text-xs uppercase tracking-[0.4em] text-gold mb-4"
          >
             Save The Date
          </motion.p>
          <h2 className="font-serif text-5xl md:text-6xl text-dark mb-6 tracking-tight">The Celebration</h2>
          <div className="w-24 h-px bg-gold mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <EventCard 
            title="Holy Matrimony"
            date="Sunday, December 20, 2026"
            time="08:00 AM - 10:00 AM"
            venue="St. Patrick Cathedral"
            address="123 Wedding Street, New York, NY 10001"
            mapUrl="https://maps.google.com"
            isAkad={true}
          />
          <EventCard 
            title="Wedding Reception"
            date="Sunday, December 20, 2026"
            time="01:00 PM - 04:00 PM"
            venue="The Grand Ballroom"
            address="456 Luxury Ave, New York, NY 10002"
            mapUrl="https://maps.google.com"
            isAkad={false}
          />
        </div>
      </div>
    </section>
  )
}
