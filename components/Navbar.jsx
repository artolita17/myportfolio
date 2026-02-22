import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`fixed top-6 left-0 right-0 z-50 ${scrolled ? 'bg-black/60' : 'bg-transparent'}`}>
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="backdrop-blur-lg border border-white/5 rounded-xl p-3 flex items-center justify-between">
          <div className="font-bold tracking-wider text-lg">ART OLITA</div>
          <div className="space-x-4 text-sm opacity-80">
            <a href="#about" className="hover:text-glow transition">About</a>
            <a href="#work" className="hover:text-glow transition">Work</a>
            <a href="#development" className="hover:text-glow transition">Development</a>
            <a href="#security" className="hover:text-glow transition">Security</a>
            <a href="#startup" className="hover:text-glow transition">Startup</a>
            <a href="#contact" className="hover:text-glow transition">Contact</a>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
