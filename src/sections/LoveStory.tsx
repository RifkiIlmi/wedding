'use client'

import { motion } from 'framer-motion'

const StoryItem = ({ year, title, description, index }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    viewport={{ once: true }}
    className={`flex items-center justify-between w-full mb-16 ${
      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
    }`}
  >
    <div className="hidden md:block w-5/12" />
    
    <div className="z-20 flex items-center justify-center w-12 h-12 rounded-full bg-gold shadow-lg border-4 border-primary">
       <span className="text-primary text-xs font-bold">{year}</span>
    </div>

    <div className="w-full md:w-5/12 bg-white p-6 md:p-8 rounded-sm shadow-xl border border-gold/5 hover:border-gold/20 transition-colors">
       <h3 className="font-serif text-2xl mb-3 text-dark">{title}</h3>
       <p className="font-sans text-sm text-dark/60 leading-relaxed italic">
          {description}
       </p>
    </div>
  </motion.div>
)

export const LoveStory = () => {
  const stories = [
    {
      year: "2020",
      title: "First Encounter",
      description: "A chance meeting at a local bookstore that changed our lives forever. We talked for hours about everything and nothing."
    },
    {
      year: "2022",
      title: "The Proposal",
      description: "Under the starlit sky of Paris, on the banks of the Seine, he asked and she said yes with tears of joy."
    },
    {
      year: "2026",
      title: "Our Forever",
      description: "Now we stand on the threshold of a new journey, ready to say 'I do' and build a life together."
    }
  ]

  return (
    <section className="py-24 md:py-32 bg-primary overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-24">
           <h2 className="font-serif text-5xl md:text-6xl text-dark mb-4 tracking-tight">Our Love Story</h2>
           <div className="w-24 h-px bg-gold mx-auto mb-8" />
           <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold/60 italic">How it all began</p>
        </div>

        <div className="relative wrap overflow-hidden p-10 h-full">
            {/* Center Line */}
            <div className="absolute border-opacity-20 border-gold h-full border left-1/2 -translate-x-1/2 md:block hidden" />
            
            {stories.map((story, index) => (
                <StoryItem 
                    key={index} 
                    {...story} 
                    index={index} 
                />
            ))}
        </div>
      </div>
    </section>
  )
}
