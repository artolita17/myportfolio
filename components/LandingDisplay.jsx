import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function LandingDisplay() {
  const imageRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scale: 1.05,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="landing-display" className="relative w-full min-h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Responsive image container */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8 lg:p-12">
        <img
          ref={imageRef}
          src="/images/LANDINGPAGE.jpg"
          alt="Landing Page Display"
          className="max-w-full max-h-full w-auto h-auto object-contain"
          style={{
            imageRendering: 'crisp-edges',
            imageRendering: '-webkit-optimize-contrast',
            aspectRatio: 'auto'
          }}
        />
      </div>
    </section>
  )
}
