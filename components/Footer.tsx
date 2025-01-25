'use client'

import { motion } from 'framer-motion'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import { FiPhone, FiMail } from 'react-icons/fi'
import Link from 'next/link'

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
    { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-purple-400">InfoHacks 2025</h3>
            <p className="mt-2">Unleash Your Creativity, Code the Future</p>
          </div>
          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.label}
                >
                  <link.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
            <div className="flex space-x-4">
              <Link href="tel:+1234567890" passHref>
                <motion.a
                  className="flex items-center text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiPhone className="w-5 h-5 mr-2" />
                  <span>Call Us</span>
                </motion.a>
              </Link>
              <Link href="mailto:info@hackfest2023.com" passHref>
                <motion.a
                  className="flex items-center text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiMail className="w-5 h-5 mr-2" />
                  <span>Email Us</span>
                </motion.a>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm border-t border-gray-800 pt-8">
          <p className="mb-2">&copy; {new Date().getFullYear()} InfoHacks. All rights reserved.</p>
          <p className="text-base">
            Designed and Developed by Dept. of{' '}
            <span className="text-blue-400 animate-pulse">INFORMATION</span>{' '}
            <span className="text-green-400 animate-pulse">TECHNOLOGY</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

