import { motion } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  { id: 1, title: 'Studio Dashboard', tech: ['React', 'Node', 'Postgres'] },
  { id: 2, title: 'Visual Editor', tech: ['Three.js', 'GSAP'] },
  { id: 3, title: 'Secure API', tech: ['Express', 'OAuth', 'JWT'] }
]

function TiltCard({ children }) {
  const ref = useRef()
  let raf = null

  const onMove = (e) => {
    cancelAnimationFrame(raf)
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    const rx = (-dy / rect.height) * 8
    const ry = (dx / rect.width) * 8
    raf = requestAnimationFrame(() => {
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.01)`
    })
  }

  const onLeave = () => {
    cancelAnimationFrame(raf)
    const el = ref.current
    raf = requestAnimationFrame(() => {
      el.style.transform = ''
    })
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="transition-transform will-change-transform">
      {children}
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold">Development Projects</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <TiltCard key={p.id}>
            <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-panel border border-white/5 rounded-xl">
              <div className="font-semibold text-lg">{p.title}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 bg-white/5 rounded">{t}</span>
                ))}
              </div>
              <div className="mt-6">
                <a className="inline-block px-4 py-2 rounded border border-white/10 hover:scale-105 transition">View Project</a>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </section>
  )
}
