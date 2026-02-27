import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get current count from localStorage
    const currentCount = localStorage.getItem('visitorCount')
    const hasVisited = sessionStorage.getItem('hasVisited')
    
    if (!hasVisited) {
      // First visit in this session, increment count
      const newCount = currentCount ? parseInt(currentCount) + 1 : 1
      localStorage.setItem('visitorCount', newCount.toString())
      sessionStorage.setItem('hasVisited', 'true')
      setVisitorCount(newCount)
    } else {
      // Returning visitor in same session
      setVisitorCount(currentCount ? parseInt(currentCount) : 1)
    }
    
    setIsLoading(false)
  }, [])

  return (
    <section id="visitor-counter" className="py-16 px-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        
        
        <div className="p-8 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl backdrop-blur-sm">
          <p className="text-white/70 mb-4 text-lg">Total Site Visits</p>
          
          {isLoading ? (
            <div className="text-4xl font-mono text-green-400 animate-pulse">
              Loading...
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative"
            >
              <div className="text-6xl md:text-7xl font-mono font-bold text-green-400 mb-4">
                {visitorCount.toLocaleString()}
              </div>
              
              <div className="absolute -inset-1 bg-green-400/20 rounded-lg blur-xl -z-10"></div>
            </motion.div>
          )}
          
          <p className="text-white/50 mt-6 text-sm">
            Thank you for visiting! 
          </p>
        </div>
        
        <motion.div 
          className="mt-8 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 * i, type: "spring", stiffness: 300 }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
