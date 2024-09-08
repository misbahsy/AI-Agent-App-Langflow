import React from 'react'

export default function Footer() {
  return (
    <footer className="relative z-10 py-8 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">AI Research Assistant</h3>
        </div>
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <ul className="flex justify-center space-x-4">
            <li><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/3 text-center md:text-right">
          <p>&copy; 2023 AI Research Assistant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}