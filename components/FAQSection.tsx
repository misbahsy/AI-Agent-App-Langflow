'use client'

import React from 'react'
import { motion } from 'framer-motion'
import GlowingCard from './GlowingCard'

export default function FAQSection() {
  const faqs = [
    { question: "How does the AI research assistant work?", answer: "Our AI research assistant utilizes advanced machine learning algorithms and natural language processing to analyze vast amounts of data, generate insights, and provide comprehensive research support tailored to your specific needs." },
    { question: "Is my research data secure?", answer: "Absolutely. We employ state-of-the-art encryption and security measures to ensure that your research data remains confidential and protected at all times." },
    { question: "Can the AI assistant handle multiple research topics simultaneously?", answer: "Yes, our AI research assistant is designed to efficiently manage multiple research topics concurrently, allowing you to explore various areas of interest without compromising on depth or quality." },
  ]

  return (
    <section className="relative z-10 py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="mb-6"
          >
            <GlowingCard>
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p>{faq.answer}</p>
            </GlowingCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}