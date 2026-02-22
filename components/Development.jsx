import { motion } from 'framer-motion'

const devProjects = [
  {
    id: 1,
    title: 'MICY : Michaelinian Cybersecurity',
    description: 'A Cybersecurity Interactive Learning Module for Saint Michael College of Caraga.',
    tech: ['HTML/CSS', 'JAVASCRIPT', 'PHP'],
    website: 'https://ccis.smccnasipit.edu.ph/',
    image: '/images/logos/image1.png'
  },
  {
    id: 2,
    title: 'HURIS : Human Resource Information System',
    description: 'Your workforce, our system—streamlining HR processes, tracking talent, and enabling smarter, data-driven decisions for CHED-Caraga.',
    tech: ['VIEW.JS', 'LARAVEL'],
    website: 'https://huris.chedcaraga.ph/',
     image: '/images/logos/image2.png'
  },
 
]

export default function Development() {
  return (
    <section id="development" className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold">Development Projects</h2>
      <p className="text-white/70 mt-2">Full-stack applications and technical solutions.</p>

      <div className="mt-8 space-y-6">
        {devProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-panel border border-white/5 rounded-xl p-6 hover:border-white/10 transition"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Project Image */}
              <div className="lg:w-1/3">
                <div className="h-48 bg-gradient-to-br from-white/3 to-white/6 rounded-lg overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="lg:w-2/3 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-white/70 mb-4">{project.description}</p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-white/5 px-3 py-1 rounded-md text-sm border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Project Button */}
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors w-fit"
                >
                  View Project →
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
