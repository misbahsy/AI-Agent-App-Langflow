import React from 'react'

interface GlowingCardProps {
  children: React.ReactNode
  className?: string
}

const GlowingCard: React.FC<GlowingCardProps> = ({ children, className = "" }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
    <div className="relative bg-gray-900 rounded-lg p-6 ring-1 ring-gray-900/5 shadow-lg">
      {children}
    </div>
  </div>
)

export default GlowingCard