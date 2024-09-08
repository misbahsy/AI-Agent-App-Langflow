'use client'

declare global {
  interface Window {
    VANTA: any;
  }
}

import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import HeroSection from './HeroSection'
import BenefitsSection from './BenefitsSection'
import HowItWorksSection from './HowItWorksSection'
import FeaturesShowcaseSection from './FeaturesShowcaseSection'
import AIAgentsSection from './AIAgentsSection'
import TestimonialsSection from './TestimonialsSection'
import FAQSection from './FAQSection'
import CTASection from './CTASection'
import Footer from './Footer'
import Link from 'next/link'

export default function EnhancedLandingPage() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const position = useTransform(scrollYProgress, (pos) => {
    return `${50 - pos * 50}% 0px`
  })

  const smoothPosition = useSpring(position, { stiffness: 400, damping: 90 })

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'
    document.body.appendChild(script)

    script.onload = () => {
      const VANTA = window.VANTA
      if (VANTA) {
        VANTA.NET({
          el: "#vanta-bg",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x3b82f6,
          backgroundColor: 0x000000,
          points: 20.00,
          maxDistance: 30.00,
          spacing: 15.00
        })
      }
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div ref={targetRef} className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white">
      <div id="vanta-bg" className="fixed inset-0 z-0"></div>
      
      <div className="relative z-10 w-full">
        <motion.div style={{ opacity, scale, y: smoothPosition }} className="w-full">
          <HeroSection />
          <div className="flex justify-center space-x-4 mt-8">
            <Link href="/sign-up" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </Link>
            <Link href="/sign-in" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
              Sign In
            </Link>
          </div>
        </motion.div>

        <motion.div style={{ y: smoothPosition }} className="w-full">
          <BenefitsSection />
          <HowItWorksSection />
          <FeaturesShowcaseSection />
          <AIAgentsSection />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
          <Footer />
        </motion.div>
      </div>
    </div>
  )
}