import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'

const sample = [

    { id: 19, title: 'RAYCO', cat: 'Graphic Design', image: '/images/graphics/racyooo finaallll.jpg' },
      { id: 13, title: 'PHEOBE', cat: 'Graphic Design', image: '/images/graphics/7.jpg' },
         { id: 21, title: 'KEISHA', cat: 'Graphic Design', image: '/images/graphics/3.jpg' },
  { id: 1, title: 'ESG CD V1', cat: 'Graphic Design', image: '/images/graphics/11.jpg' },
  { id: 2, title: 'ESG CD V2', cat: 'Graphic Design', image: '/images/graphics/2.jpg' },
   { id: 3, title: 'MCG ', cat: 'Graphic Design', image: '/images/graphics/5.jpg' },
  { id: 4, title: 'BOG Chrome', cat: 'Graphic Design', image: '/images/graphics/bog chrome silver.jpg' },
  { id: 5, title: 'RJWORKZ', cat: 'Graphic Design', image: '/images/graphics/RJWORKZ.jpg' },
   { id: 6, title: 'TALISAY BKB', cat: 'Graphic Design', image: '/images/graphics/8.jpg' },
  { id: 7, title: 'BOYS OF GEAR SHIRT', cat: 'Graphic Design', image: '/images/graphics/BOYS OF GEAR SHIRT final.jpg' },
   { id: 8, title: 'MDNGHT BOYZ', cat: 'Graphic Design', image: '/images/graphics/final mdnght boyz.jpg' },
   { id: 9, title: 'NILLSON', cat: 'Graphic Design', image: '/images/graphics/nillsonnnnnnn.jpg' },
   { id: 10, title: 'PINAKA BOT', cat: 'Graphic Design', image: '/images/graphics/pinaka final bot.jpg' },
   { id: 11, title: 'TALISAY JERSEY', cat: 'Graphic Design', image: '/images/graphics/talisay jersey v2.jpg' },
   { id: 22, title: 'LORENZIONIANS', cat: 'Graphic Design', image: '/images/graphics/lorenznians.jpg' },
     { id: 14, title: 'TALISAY VB', cat: 'Graphic Design', image: '/images/graphics/9.jpg' },
  { id: 15, title: 'TES BATCH 14', cat: 'Graphic Design', image: '/images/graphics/10.jpg' },
  { id: 12, title: 'DOST EXPERTALK', cat: 'Graphic Design', image: '/images/graphics/6.jpg' },
  { id: 16, title: 'CRISOSTOMO', cat: 'Graphic Design', image: '/images/graphics/1.jpg' },
  { id: 17, title: '0.5 PHOTOBOOTH', cat: 'Graphic Design', image: '/images/graphics/0.5 photobooth.jpg' },
  { id: 18, title: 'MUTYA NG TALISAY', cat: 'Graphic Design', image: '/images/graphics/13.jpg' },
   { id: 20, title: 'DANIELLA', cat: 'Graphic Design', image: '/images/graphics/4.jpg' },
   { id: 23, title: 'MDNGHT BOYZ BANNER', cat: 'Graphic Design', image: '/images/graphics/mdnght boys banner.jpg' },
   { id: 24, title: '5TH BOG TAMBIKE', cat: 'Graphic Design', image: '/images/graphics/5th bog tambike.jpg' },
   { id: 26, title: 'BOYS OF GEAR BANNER', cat: 'Graphic Design', image: '/images/graphics/boys of gear banner.jpg' },
   { id: 27, title: 'CYBER HYGIENE', cat: 'Graphic Design', image: '/images/graphics/cyber hygiene.jpg' },
   { id: 28, title: 'FREE COFFEE', cat: 'Graphic Design', image: '/images/graphics/FREE COFFEE.jpg' },
   { id: 29, title: 'KRIANSTYLE LOGO', cat: 'Graphic Design', image: '/images/graphics/KRIASSTYELL.jpg' },
   { id: 30, title: 'NGL', cat: 'Graphic Design', image: '/images/graphics/NGL.jpg' },
   { id: 31, title: 'PUBMAT', cat: 'Graphic Design', image: '/images/graphics/PUBMAT.jpg' },
   { id: 32, title: 'PUBMAT', cat: 'Graphic Design', image: '/images/graphics/esggdhjahjhjhgjsadghjasgha.jpg' },
   { id: 33, title: 'FRANK WORKZ', cat: 'Graphic Design', image: '/images/graphics/frank with bg.jpg' },
   { id: 34, title: 'NEXORA FINAL LOGO', cat: 'Graphic Design', image: '/images/graphics/nexora final log.png' },
   { id: 35, title: 'TAPATAN 2026', cat: 'Graphic Design', image: '/images/graphics/tapanadadada.jpg' },
   { id: 36, title: 'TRISHA', cat: 'Graphic Design', image: '/images/graphics/trishaadasga.jpg' },
   { id: 37, title: 'VOICES WITH IMPACT', cat: 'Graphic Design', image: '/images/graphics/vpices with umpact.jpg' },
   { id: 38, title: 'MUTYA NG TALISAY CORONATION', cat: 'Graphic Design', image: '/images/graphics/CORONATION PINAKA FINAL.jpg' },
   { id: 39, title: 'YEAR END', cat: 'Graphic Design', image: '/images/graphics/yearend.jpg' },
   { id: 30, title: 'KRIAN STYLE SHIRT', cat: 'Graphic Design', image: '/images/graphics/kriansss.jpg' },

]

export default function Work() {
  const [filter, setFilter] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)
  const [visibleItems, setVisibleItems] = useState(6) // Show only 6 items initially
  const [loadedImages, setLoadedImages] = useState(new Set())
  
  const categories = useMemo(() => ['All', ...new Set(sample.map((s) => s.cat))], [])
  const visible = useMemo(() => sample.filter((s) => filter === 'All' || s.cat === filter), [filter])
  const displayItems = useMemo(() => visible.slice(0, visibleItems), [visible, visibleItems])

  const loadMoreItems = useCallback(() => {
    setVisibleItems(prev => Math.min(prev + 6, visible.length))
  }, [visible.length])

  const handleImageLoad = useCallback((id) => {
    setLoadedImages(prev => new Set(prev).add(id))
  }, [])

  const btnsRef = useRef()
  const observerRef = useRef()

  useEffect(() => {
    if (!btnsRef.current) return
    gsap.from(btnsRef.current.children, { y: 8, opacity: 0, stagger: 0.06, duration: 0.6, ease: 'power2.out' })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleItems < visible.length) {
          loadMoreItems()
        }
      },
      { threshold: 0.1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [visibleItems, visible.length, loadMoreItems])

  return (
    <section id="work" className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold">Creative Work</h2>
      <p className="text-white/70 mt-2">A selection of visual and interactive projects.</p>

      <div ref={btnsRef} className="mt-6 flex gap-3 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3 py-1 rounded-md text-sm ${filter === c ? 'bg-white/6 text-glow' : 'bg-transparent border border-white/5'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {displayItems.map((s) => (
            <motion.div
              layout
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedItem(s)}
              className="relative overflow-hidden rounded-xl bg-panel border border-white/5 p-4 cursor-pointer"
            >
              <div className="h-40 bg-gradient-to-br from-white/3 to-white/6 rounded-md flex items-center justify-center text-white/70 relative overflow-hidden">
                {!loadedImages.has(s.id) && (
                  <div className="absolute inset-0 bg-white/5 animate-pulse" />
                )}
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  onLoad={() => handleImageLoad(s.id)}
                  className={`absolute inset-0 w-full h-full object-cover rounded-md transition-opacity duration-300 ${
                    loadedImages.has(s.id) ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                  <div className="bg-black/60 px-3 py-2 rounded">View</div>
                </div>
              </div>
              <div className="mt-3">
                <div className="font-semibold">{s.title}</div>
                <div className="text-xs text-white/60 mt-1">{s.cat}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load more trigger */}
      {displayItems.length < visible.length && (
        <div ref={observerRef} className="mt-8 flex justify-center">
          <button
            onClick={loadMoreItems}
            className="bg-white/6 border border-white/5 px-6 py-2 rounded-md hover:bg-white/10 transition"
          >
            Load More ({visible.length - displayItems.length} remaining)
          </button>
        </div>
      )}

      {/* Modal for viewing selected item */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
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
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/80 z-10"
                >
                  ×
                </button>
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold">{selectedItem.title}</h3>
                  <p className="text-white/70 mt-2">{selectedItem.cat}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
