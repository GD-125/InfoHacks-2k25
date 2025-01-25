'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/app/providers'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  }

  return (
    <div className="relative inline-block">
      <motion.button
        className={`
          relative flex items-center justify-between w-[100px] sm:w-[140px] h-[38px] px-[4px] 
          rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 
          dark:from-purple-900 dark:to-pink-900
          backdrop-blur-sm
          transition-all duration-500
        `}
        onClick={toggleTheme}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="absolute text-xs font-medium hidden sm:block"
          animate={{
            x: theme === 'dark' ? 14 : 82,
            opacity: 0.5
          }}
          transition={spring}
        >
          {theme === 'dark' ? 'DARK' : 'LIGHT'}
        </motion.span>

        <motion.div
          className={`
            absolute left-[2px] w-[48px] sm:w-[68px] h-[34px] 
            rounded-full bg-white dark:bg-gray-900
            shadow-lg
          `}
          layout
          transition={spring}
          animate={{
            x: theme === 'dark' ? (window.innerWidth < 640 ? 46 : 66) : 0
          }}
        />

        <motion.div
          className="relative z-10 flex items-center justify-between w-full"
          animate={{
            x: theme === 'dark' ? -10 : 10
          }}
          transition={spring}
        >
          <div className="flex items-center justify-center w-12 sm:w-16 h-8">
            <Sun className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="flex items-center justify-center w-12 sm:w-16 h-8">
            <Moon className="w-5 h-5 text-purple-500" />
          </div>
        </motion.div>
      </motion.button>

      <motion.div
        className="absolute -inset-1 rounded-full blur-md"
        animate={{
          background: theme === 'dark'
            ? "linear-gradient(45deg, #6b21a8 0%, #4c1d95 100%)"
            : "linear-gradient(45deg, #c084fc 0%, #a855f7 100%)",
          opacity: [0, 0.2, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </div>
  )
}

