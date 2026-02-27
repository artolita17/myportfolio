import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackToTop() {
  const [isVisible] = useState(true) // always visible
  const [launching, setLaunching] = useState(false)

  // visibility is constant so no effect needed

  const scrollToLanding = () => {
    const target = document.getElementById('landing-display')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleClick = () => {
    // start launch animation
    setLaunching(true)
    // after animation completes move scroll
    setTimeout(() => {
      scrollToLanding()
      setLaunching(false)
    }, 800) // should match transition duration below
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={launching ? { y: -window.innerHeight, scale: 0.5, opacity: 0 } : { opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: launching ? 0.8 : 0.3 }}
          whileHover={{ 
            scale: launching ? 1 : 1.2, 
            y: launching ? 0 : -5,
            rotate: launching ? 0 : -15,
            transition: { duration: 0.3 }
          }}
          whileTap={{ 
            scale: 0.9,
            transition: { duration: 0.1 }
          }}
          onClick={handleClick}
          className="fixed bottom-6 right-6 z-[99999] w-14 h-14 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 text-white rounded-full shadow-xl flex items-center justify-center border-2 border-cyan-400/50 relative overflow-hidden group backdrop-blur-sm"
          style={{ position: 'fixed', bottom: '24px', right: '24px', left: 'auto' }}
          aria-label="Navigate to Landing Display"
        >
          {/* Rocket boost effect - fire and smoke */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 pointer-events-none">
            {/* Fire flame */}
            <div className="absolute w-6 h-8 bg-gradient-to-b from-orange-500 via-yellow-400 to-transparent rounded-b-full animate-pulse"></div>
            <div className="absolute w-4 h-6 bg-gradient-to-b from-red-500 via-orange-400 to-transparent rounded-b-full scale-75 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            
            {/* Smoke particles */}
            <div className="absolute -bottom-2 w-10 h-10 bg-gray-400/50 rounded-full blur-lg animate-ping" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute -bottom-1 w-8 h-8 bg-gray-300/60 rounded-full blur-md animate-ping" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute w-6 h-6 bg-white/40 rounded-full blur-sm animate-ping" style={{ animationDelay: '0.4s' }}></div>
          </div>
          
          {/* Main button with glow */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <svg 
              className="w-6 h-6 transition-transform duration-300"
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2C12 2 7 6 7 12C7 14 8 16 9 17L10 14L11 16L12 14L13 16L14 14L15 17C16 16 17 14 17 12C17 6 12 2 12 2M12 6L13.5 9L12 8L10.5 9L12 6Z"/>
            </svg>
          </div>
          {/* white launch trail */}
          {launching && (
            <motion.div
              className="absolute -bottom-6 left-1/2 w-1 h-20 bg-white/70 rounded-full blur-md"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -60 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          )}
          
          {/* Hover glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
          
          {/* Sparkle particles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-ping"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-ping"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-ping"></div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
