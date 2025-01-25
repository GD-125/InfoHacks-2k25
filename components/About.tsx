'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const aboutItems = [
  { title: 'Innovate', icon: '💡', description: 'Bring your wildest ideas to life' },
  { title: 'Collaborate', icon: '🤝', description: 'Work with talented individuals' },
  { title: 'Learn', icon: '🚀', description: 'Gain new skills and experiences' },
  { title: 'Network', icon: '🌐', description: 'Connect with industry professionals' },
  { title: 'Compete', icon: '🏆', description: 'Win exciting prizes and recognition' },
  { title: 'Inspire', icon: '✨', description: 'Be part of the next big thing' },
]

const About = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-purple-400 mb-4">About InfoHacks 2025</h2>
          <p className="text-xl text-gray-300">Join us for an exciting 48-hour coding marathon!</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-700 dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: hoveredIndex === index ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
                className="text-4xl mb-4"
              >
                {item.icon}
              </motion.div>
              <h3 className="text-2xl font-semibold mb-2 text-purple-300">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black opacity-50"></div>
        <svg className="absolute bottom-0 left-0 right-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#1F2937" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  )
}

export default About

