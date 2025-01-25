'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Trophy, Gift, Award, Star } from 'lucide-react'
import { useRef } from 'react'

const awards = [
  {
    title: "First Prize",
    amount: "Rs.5,000",
    benefits: ["Cash Prize", "Prestigious Certificates"],
    icon: Trophy,
    color: "from-yellow-400 to-yellow-600"
  },
  {
    title: "Second Prize",
    amount: "Rs.3,000",
    benefits: ["Cash Prize", "Prestigious Certificates"],
    icon: Award,
    color: "from-gray-400 to-gray-600"
  },
  {
    title: "Third Prize",
    amount: "Rs.1,500",
    benefits: ["Cash Prize", "Prestigious Certificates"],
    icon: Gift,
    color: "from-amber-700 to-amber-900"
  },
  {
    title: "Best Women's Team",
    amount: "Rs.5,000",
    benefits: ["Recognition Awards", "Prestigious Certificate"],
    icon: Star,
    color: "from-purple-400 to-purple-600"
  }
]

const Awards = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-5"></div>
      <motion.div
        ref={containerRef}
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-purple-400 mb-4">Awards & Rewards</h2>
          <p className="text-xl text-gray-300">Celebrating Innovation and Excellence</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-gray-800 p-6 rounded-lg h-full">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${award.color} flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-300`}>
                  <award.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 text-purple-300">{award.title}</h3>
                <p className="text-3xl font-bold text-center mb-6 text-white">{award.amount}</p>
                <ul className="space-y-3">
                  {award.benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center text-gray-300"
                    >
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Awards

