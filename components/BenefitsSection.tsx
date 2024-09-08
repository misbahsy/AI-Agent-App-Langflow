'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { GlobeAltIcon, CodeBracketIcon, BeakerIcon } from '@heroicons/react/24/outline'
import GlowingCard from './GlowingCard'

export default function BenefitsSection() {
  const benefits = [
    { icon: <GlobeAltIcon className="h-12 w-12 mb-4 text-blue-400" />, title: "Global Knowledge Access", description: "Tap into the vast expanse of internet knowledge for comprehensive research insights." },
    { icon: <CodeBracketIcon className="h-12 w-12 mb-4 text-purple-400" />, title: "Intelligent Code Generation", description: "Seamlessly generate and analyze code snippets to support your research findings." },
    { icon: <BeakerIcon className="h-12 w-12 mb-4 text-green-400" />, title: "Advanced Data Analysis", description: "Perform in-depth analysis on complex datasets with cutting-edge AI assistance." },
  ]

  return (
    <section className="relative z-10 py-20 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Revolutionize Your Research</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <GlowingCard>
              {benefit.icon}
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p>{benefit.description}</p>
            </GlowingCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}