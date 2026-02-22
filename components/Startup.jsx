import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const startupImages = [
  { id: 1, src: '/images/pitching/image1.png', title: 'Startup 9 Top 10 Finalists' },
  { id: 2, src: '/images/pitching/image2.png', title: 'Startup 9 Top 10 Finalists' },
  { id: 3, src: '/images/pitching/nexora1.png', title: 'Startup 10 Top 15 Finalist' },
  { id: 4, src: '/images/pitching/nexora2.png', title: 'Startup 10 Top 15 Finalist' },
  { id: 5, src: '/images/pitching/nxora3.png', title: 'Best StartUp Logo' }
]

export default function Startup() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <section id="startup" className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold">Startup Competitions</h2>
      <p className="text-white/70 mt-2">Pitching innovations and entrepreneurial achievements.</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {startupImages.map((image, index) => (
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

      {/* Modal for viewing selected image */}
      <AnimatePresence>
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
                    {selectedImage.title === 'Startup 9 Top 10 Finalists' && 'Achieved Top 10 Finalist status in the 9th Startup Competition, demonstrating innovative business ideas and entrepreneurial excellence.'}
                    {selectedImage.title === 'Startup 10 Top 15 Finalist' && 'Secured Top 15 Finalist position in the 10th Startup Competition, showcasing advanced pitching skills and business acumen.'}
                    {selectedImage.title === 'Best StartUp Logo' && 'Received recognition for Best Startup Logo Design, combining creative branding with entrepreneurial vision.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
