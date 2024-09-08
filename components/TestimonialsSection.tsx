'use client'

import React from 'react'
import { motion } from 'framer-motion'
import GlowingCard from './GlowingCard'

export default function TestimonialsSection() {
  const testimonials = [
    { name: "Dr. Emily Chen", role: "Quantum Physics Researcher", quote: "This AI research assistant has revolutionized my workflow. It's like having a team of experts at my fingertips 24/7, accelerating my research in ways I never thought possible." },
    { name: "Mark Johnson", role: "Data Science Lead", quote: "The ability to quickly analyze large datasets and generate visualizations has saved me countless hours. It's an indispensable tool that has dramatically improved our team's productivity and insights." },
  ]

  return (
    <section className="relative z-10 py-20 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Voices of Innovation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <GlowingCard>
              <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </GlowingCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}