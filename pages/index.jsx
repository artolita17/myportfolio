import Head from 'next/head'
import dynamic from 'next/dynamic'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import LandingDisplay from '../components/LandingDisplay'
import About from '../components/About'
import Work from '../components/Work'
import Development from '../components/Development'
import Security from '../components/Security'
import Startup from '../components/Startup'
import Projects from '../components/Projects'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen antialiased">
      <Head>
        <title>ART OLITA — Creative Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />
      <main>
  
        <LandingDisplay />
        <About />
        <Work />
        <Development />
        <Security />
        <Startup />
        <Contact />
      </main>
    </div>
  )
}
