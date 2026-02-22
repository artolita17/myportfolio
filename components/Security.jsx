import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const cyberImages = [
  { id: 1, src: '/images/cybersecurity/image1.png', title: 'FIRST BUG BOUNTY ACQUIRED' },
  { id: 2, src: '/images/cybersecurity/image2.png', title: 'HACK FOR GOV 4 2ND RUNNER-UP' },
  { id: 3, src: '/images/cybersecurity/image3.png', title: 'HACK FOR GOV 3 2ND RUNNER-UP' },
  { id: 4, src: '/images/cybersecurity/image4.png', title: 'HACK FOR GOV 2 2ND RUNNER-UP' },
  { id: 5, src: '/images/cybersecurity/MICHAELINIAN_cybersecurity_GUILD-removebg-preview.png', title: 'Michaelinian Cybersecurity Guild Founder' }
]

function TypingTerminal({ lines }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (index >= lines.length) return
    let i = 0
    const line = lines[index]
    const t = setInterval(() => {
      setText((s) => s + line[i])
      i++
      if (i >= line.length) {
        clearInterval(t)
        setTimeout(() => {
          setText((s) => s + '\n')
          setIndex((n) => n + 1)
        }, 700)
      }
    }, 30) // Slightly faster typing
    return () => clearInterval(t)
  }, [index])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <pre className="whitespace-pre-wrap text-green-400 font-mono text-sm leading-relaxed">
      {text}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-green-400`}>_</span>
    </pre>
  )
}

export default function Security() {
  const [selectedImage, setSelectedImage] = useState(null)
  
  const lines = [
    '> initializing secure shell...\n',
    '> running vulnerability scan...\n',
    '• Web Security: OWASP, XSS, CSRF\n',
    '• CTF Challenges: Reverse, Forensics\n',
    '• Secure Backend: Auth, Rate-limiting\n'
  ]

  return (
    <section id="security" className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold">Cybersecurity</h2>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-[#071014] border border-white/5 rounded-xl font-mono text-sm">
          <TypingTerminal lines={lines} />
        </div>

        <div className="p-6 bg-panel border border-white/5 rounded-xl">
          <div className="font-semibold text-green-400 font-mono mb-3">{'> loading skills...'}</div>
          <div className="text-green-400 font-mono text-sm space-y-2">
            <div>• Web Security & Penetration Testing</div>
            <div>• CTF Challenges & Tooling</div>
            <div>• Secure Backend Architecture</div>
          </div>
        </div>
      </div>

      {/* Cybersecurity Images Gallery */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-6">Cybersecurity Projects & Activities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cyberImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl bg-panel border border-white/5 group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-white font-semibold">{image.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for viewing selected image */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-panel rounded-xl max-w-4xl max-h-[90vh] overflow-auto border border-white/10"
          >
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/80 z-10"
              >
                ×
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                <p className="text-white/70 mt-2">
                  {selectedImage.title === 'FIRST BUG BOUNTY ACQUIRED' && 'Successfully identified and reported a critical security vulnerability, earning recognition and reward through responsible disclosure practices.'}
                  {selectedImage.title === 'HACK FOR GOV 4 2ND RUNNER-UP' && 'Secured 2nd runner-up position in the 4th Hack for Government competition, developing innovative cybersecurity solutions for public sector challenges.'}
                  {selectedImage.title === 'HACK FOR GOV 3 2ND RUNNER-UP' && 'Achieved 2nd runner-up placement in the 3rd Hack for Government event, showcasing advanced skills in security-focused development and problem-solving.'}
                  {selectedImage.title === 'HACK FOR GOV 2 2ND RUNNER-UP' && 'Earned 2nd runner-up honors in the 2nd Hack for Government competition, demonstrating expertise in creating secure digital solutions for government services.'}
                  {selectedImage.title === 'Michaelinian Cybersecurity Guild Founder' && 'Founded and established the official cybersecurity guild at Saint Michael College of Caraga, creating a platform for security education and competitive activities.'}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
