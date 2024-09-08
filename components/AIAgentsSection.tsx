'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MagnifyingGlassIcon, ChatBubbleBottomCenterTextIcon, CpuChipIcon } from '@heroicons/react/24/outline'
import GlowingCard from './GlowingCard'

export default function AIAgentsSection() {
  const agents = [
    { icon: <MagnifyingGlassIcon className="h-12 w-12 mb-4 text-blue-400" />, name: "DataMiner", description: "Specializes in extracting and analyzing large datasets with unparalleled speed and accuracy." },
    { icon: <ChatBubbleBottomCenterTextIcon className="h-12 w-12 mb-4 text-purple-400" />, name: "LinguistAI", description: "Processes and interprets natural language, providing context and understanding to complex texts." },
    { icon: <CpuChipIcon className="h-12 w-12 mb-4 text-green-400" />, name: "CodeGenius", description: "Generates, optimizes, and explains code across multiple programming languages." },
  ]

  return (
    <section className="relative z-10 py-20 px-4 bg-gradient-to-r from-purple-900 to-blue-900">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">Meet Your AI Research Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {agents.map((agent, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <GlowingCard className="h-full">
              {agent.icon}
              <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
              <p>{agent.description}</p>
            </GlowingCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}