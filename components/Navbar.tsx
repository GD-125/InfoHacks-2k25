"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const navItems = ["About", "Projects", "Awards", "Venue", "Team", "Coordinators"]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-800 bg-opacity-90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:from-pink-600 hover:to-purple-400 transition-all duration-500"
            >
              InfoHacks 2025
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105"
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(item.toLowerCase())
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  {item}
                </Link>
              ))}
              <Link
                href="/guidelines/InfoHacks2025_Guidelines.pdf"
                download
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-300 mr-2"
              >
                Guidelines
              </Link>
              <Link
                href="/register"
                className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors duration-300"
              >
                Register Now
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(item.toLowerCase())
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                  }
                  setIsOpen(false)
                }}
              >
                {item}
              </Link>
            ))}
            <Link
              href="/guidelines/InfoHacks2025_Guidelines.pdf"
              download
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Guidelines
            </Link>
            <Link
              href="/register"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Register Now
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar

