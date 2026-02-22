import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const { name, email, message } = formData
    
    // Create mailto link
    const subject = encodeURIComponent(`Contact from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)
    const mailtoLink = `mailto:artolita17@gmail.com?subject=${subject}&body=${body}`
    
    // Open email client
    window.location.href = mailtoLink
    
    // Show success message
    setSubmitStatus('Opening your email client...')
    setTimeout(() => {
      setSubmitStatus('Message sent successfully!')
      setFormData({ name: '', email: '', message: '' })
    }, 1000)
    setTimeout(() => setSubmitStatus(''), 5000)
  }
  return (
    <section id="contact" className="py-24 px-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold">Contact</h2>
      <p className="text-white/70 mt-2">Get in touch for collaborations, projects, or security engagements.</p>
      
      <div className="mt-4 p-4 bg-panel/50 border border-white/10 rounded-lg text-center">
        <p className="text-sm text-white/60">Or email directly:</p>
        <a href="mailto:artolita17@gmail.com" className="text-green-400 hover:text-green-300 font-mono">
          artolita17@gmail.com
        </a>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <input 
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="p-3 rounded-lg bg-transparent border border-white/10" 
          placeholder="Your name" 
          required
        />
        <input 
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="p-3 rounded-lg bg-transparent border border-white/10" 
          placeholder="Email" 
          required
        />
        <textarea 
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="p-3 rounded-lg bg-transparent border border-white/10" 
          rows={5} 
          placeholder="Message" 
          required
        />
        <button 
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-white/10 to-white/6 border border-glow text-glow hover:brightness-125 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {submitStatus && (
        <div className={`mt-4 p-3 rounded-lg text-center ${
          submitStatus.includes('successfully') 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {submitStatus}
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <a href="https://www.facebook.com/azakuzuk12" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:text-glow transition">Facebook</a>
        <a href="https://github.com/artolita17e" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:text-glow transition">GitHub</a>
           </div>
    </section>
  )
}
