"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Download, FileText } from "lucide-react"

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }

      window.addEventListener("mousemove", handleMouseMove)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }

      window.addEventListener("resize", handleResize)
      handleResize() // Set initial size

      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-purple-900 to-gray-800 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto"
      >
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-300 dark:to-pink-500"
        >
          InfoHacks 2025
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto"
        >
          Unleash Your Creativity, Code the Future
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <motion.a
            href="/register"
            className="w-full sm:w-auto bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center justify-center gap-2 min-w-[200px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register Now
          </motion.a>
          <motion.a
            href="/template.pptx"
            download="InfoHacks2025_Template.pptx"
            className="w-full sm:w-auto bg-transparent border-2 border-purple-500 text-purple-400 px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-900/20 transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center justify-center gap-2 min-w-[200px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            Template
          </motion.a>
          <motion.a
            href="/guidelines.pdf"
            download="InfoHacks2025_Guidelines.pdf"
            className="w-full sm:w-auto bg-transparent border-2 border-pink-500 text-pink-400 px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-900/20 transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center justify-center gap-2 min-w-[200px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className="w-5 h-5" />
            Guidelines
          </motion.a>
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black opacity-75"></div>
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.3) 0%, rgba(0, 0, 0, 0) 50%)`,
          }}
        ></motion.div>
        <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-10"></div>
      </div>
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500 rounded-full"
            initial={{
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
            }}
            animate={{
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>
    </section>
  )
}

export default Hero

