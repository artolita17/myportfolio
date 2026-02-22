import { motion } from 'framer-motion'
import Avatar from './Avatar'

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 flex justify-center md:justify-start">
            <div className="glass p-4 rounded-xl">
              <Avatar />
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold">About Me</h2>
            <p className="mt-4 text-white/80 max-w-3xl">
              I am a multi-disciplinary creative: graphic artist, video editor, full-stack developer and cybersecurity
              enthusiast. I am the founder of LAPSAG GRAPHICHS AND MOTION and MICHAELINIAN CYBERSECURITY GUILD.
              I build immersive visual experiences that blend design, code, and security-minded thinking.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 bg-panel border border-white/5 rounded-xl backdrop-blur-sm">
                <div className="text-4xl font-semibold">5+</div>
                <div className="text-sm text-white/70 mt-1">Years Experience</div>
              </div>
              <div className="p-6 bg-panel border border-white/5 rounded-xl backdrop-blur-sm">
                <div className="text-4xl font-semibold">120+</div>
                <div className="text-sm text-white/70 mt-1">Projects Completed</div>
              </div>
              <div className="p-6 bg-panel border border-white/5 rounded-xl backdrop-blur-sm">
                <div className="text-4xl font-semibold">Dev • Design • Sec</div>
                <div className="text-sm text-white/70 mt-1">Tech Stack</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
