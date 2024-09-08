'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import ShimmeringButton from './ShimmeringButton'

export default function HeroSection() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          AI-Powered Research Revolution
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Unleash the power of CrewAI Agents and Langflow to transform your research process.
        </p>
        <ShimmeringButton className="text-lg">
          Embark on Your AI Journey
        </ShimmeringButton>
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowRightIcon className="h-8 w-8 rotate-90" />
      </motion.div>
    </section>
  )
}