'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Calendar, Clock } from 'lucide-react'
import { useRef } from 'react'

const Venue = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])


  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      <motion.div
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-purple-400 mb-4">Event Venue</h2>
          <p className="text-xl text-gray-300">Join Us at Our Prime Location</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            style={{ y }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-lg shadow-xl"
            >
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-purple-400 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-purple-300 mb-2">Location</h3>
                  <p className="text-gray-300">IT Seminar Hall</p>
                  <p className="text-gray-400">Dept. of INFORMATION TECHNOLOGY</p>
                  <p className="text-gray-400">PACET</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-lg shadow-xl"
            >
              <div className="flex items-start space-x-4">
                <Calendar className="w-6 h-6 text-purple-400 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-purple-300 mb-2">Date</h3>
                  <p className="text-gray-300">Feb 17, 2025</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-lg shadow-xl"
            >
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-purple-400 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-purple-300 mb-2">Time</h3>
                  <p className="text-gray-300">9:00 AM - 5:00 PM</p>
                  <p className="text-gray-400">Registration closes at Feb 15, 2025 by 10:00 PM</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9587.809859848972!2d77.02946939449349!3d10.674201828390357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8379603118171%3A0xaabce92d2cdd4e50!2sP.%20A.%20College%20of%20Engineering%20and%20Technology%20(Autonomous)%2C%20Pollachi%2C%20Coimbatore!5e1!3m2!1sen!2sin!4v1737011929539!5m2!1sen!2sin" 
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent pointer-events-none"></div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-5"></div>
    </section>
  )
}

export default Venue

