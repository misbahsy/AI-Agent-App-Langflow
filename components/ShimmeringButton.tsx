import React from 'react'

interface ShimmeringButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

const ShimmeringButton: React.FC<ShimmeringButtonProps> = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`relative px-6 py-3 font-bold text-white rounded-full group ${className}`}
  >
    <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-purple-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
    <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-pink-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
    <span className="relative">{children}</span>
  </button>
)

export default ShimmeringButton