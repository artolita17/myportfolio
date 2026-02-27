import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-green-400/20 to-blue-500/20 border border-green-400/30 rounded-full backdrop-blur-sm hover:from-green-400/30 hover:to-blue-500/30 hover:border-green-400/50 transition-all duration-300 group"
          aria-label="Back to top"
        >
          <svg 
            className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl -z-10 group-hover:bg-green-400/30 transition-colors"></div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
