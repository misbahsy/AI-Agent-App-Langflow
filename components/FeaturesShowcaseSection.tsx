'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlowingCard from './GlowingCard'

export default function FeaturesShowcaseSection() {
  const [currentFeature, setCurrentFeature] = useState(0)
  const features = [
    { title: "Smart Search Algorithms", description: "Our AI utilizes advanced search algorithms to find the most relevant and up-to-date information for your research." },
    { title: "Real-time Collaboration", description: "Collaborate with AI agents and team members in real-time, streamlining your research process like never before." },
    { title: "Interactive Visualizations", description: "Transform complex data into stunning, interactive visualizations that bring your research to life." },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative z-10 py-20 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Experience the Future</h2>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <GlowingCard>
                  <h3 className="text-2xl font-semibold mb-4">
                    {features[currentFeature].title}
                  </h3>
                  <p>{features[currentFeature].description}</p>
                </GlowingCard>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="relative h-64 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-xl opacity-50"></div>
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/placeholder.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}