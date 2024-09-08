'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function HowItWorksSection() {
  const steps = [
    { step: 1, title: "Input Your Research Query", description: "Provide our AI with your research question or area of interest." },
    { step: 2, title: "AI Agents Collaborate", description: "Watch as our CrewAI Agents work in harmony to gather and analyze relevant information." },
    { step: 3, title: "Receive Comprehensive Insights", description: "Get a detailed report with cutting-edge insights, code snippets, and interactive data visualizations." },
  ]

  return (
    <section className="relative z-10 py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">The Future of Research</h2>
      <div className="max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex items-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur"></div>
              <div className="relative bg-gray-900 rounded-full p-4 mr-4">
                <span className="text-2xl font-bold">{step.step}</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}