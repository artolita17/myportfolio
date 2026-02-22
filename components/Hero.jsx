import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { gsap } from 'gsap'

const FloatingScene = dynamic(() => import('./Scene'), { ssr: false })

export default function Hero() {
  const titleRef = useRef()
  const btnRef = useRef()
  const router = useRouter()
  const debug = router?.query?.debug === '1' || router?.query?.debug === 'true'

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only animate buttons to avoid initial title translation/visibility issues
      if (btnRef.current) {
        gsap.from(btnRef.current.children, { y: 10, opacity: 0, duration: 0.9, delay: 0.4, stagger: 0.08 })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background scene (full-bleed) */}
      <FloatingScene className="absolute inset-0 -z-10" />

      {/* Debug overlays */}
      {debug && (
        <div aria-hidden className="pointer-events-none">
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: 'rgba(255,0,0,0.6)', zIndex: 60 }} />
          <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '80%', maxWidth: '1200px', height: '80%', border: '1px dashed rgba(255,255,255,0.12)', zIndex: 60 }} />
        </div>
      )}

      {/* Absolute centered hero block */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
        <div className="w-full max-w-3xl text-center pointer-events-auto px-6">
          <h1 ref={titleRef} className="text-white text-[clamp(36px,8vw,96px)] font-extrabold tracking-tight leading-none z-40">
            ART OLITA
          </h1>

          <p className="mt-4 text-xl text-white/80">
            Creative Developer | Cybersecurity | Visual Storyteller
          </p>

          <div ref={btnRef} className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <a href="#work" className="inline-flex px-6 py-3 rounded-lg bg-gradient-to-r from-white/10 to-white/6 border border-white/10 backdrop-blur-lg hover:scale-105 transition transform">
              Explore Work
            </a>
            <a href="#contact" className="inline-flex px-6 py-3 rounded-lg border border-glow text-glow hover:brightness-125 transition">
              Contact
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-white/60">Scroll to explore ↓</div>
    </section>
  )
}
