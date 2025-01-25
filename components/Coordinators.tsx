'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { FiPhone, FiMessageSquare } from 'react-icons/fi'
import Link from 'next/link'

const coordinators = [
  { name: 'Dr. Emily Chen', role: 'Lead Organizer', phone: '+1234567890', whatsapp: '+1234567890' },
  { name: 'Prof. Michael Johnson', role: 'Technical Advisor', phone: '+1234567891', whatsapp: '+1234567891' },
  { name: 'Dr. Sarah Thompson', role: 'Mentorship Coordinator', phone: '+1234567892', whatsapp: '+1234567892' },
  { name: 'Prof. David Lee', role: 'Judging Panel Lead', phone: '+1234567893', whatsapp: '+1234567893' },
]

const Coordinators = () => {
  const controls = useAnimation()
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible')
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <section id="coordinators" className="py-20 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-purple-400 mb-12"
        >
          Meet Our Coordinators
        </motion.h2>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {coordinators.map((coordinator, index) => (
            <motion.div
              key={coordinator.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 p-6"
            >
              <h3 className="text-xl font-semibold text-purple-300 mb-2">{coordinator.name}</h3>
              <p className="text-gray-400 mb-4">{coordinator.role}</p>
              <div className="flex justify-between items-center">
                <Link href={`tel:${coordinator.phone}`} passHref>
                  <motion.a
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-purple-400 hover:text-purple-300"
                    aria-label={`Call ${coordinator.name}`}
                  >
                    <FiPhone className="w-6 h-6" />
                  </motion.a>
                </Link>
                <Link href={`https://wa.me/${coordinator.whatsapp}`} passHref>
                  <motion.a
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-purple-400 hover:text-purple-300"
                    aria-label={`WhatsApp ${coordinator.name}`}
                  >
                    <FiMessageSquare className="w-6 h-6" />
                  </motion.a>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
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

export default Coordinators

