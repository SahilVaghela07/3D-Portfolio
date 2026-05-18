import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { initGalleryBackground } from './gallery-bg'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (loading) {
      return undefined
    }

    return initGalleryBackground()
  }, [loading])

  // Track mouse position for glass card glow effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.glass-card')
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        card.style.setProperty('--mouse-x', `${x}%`)
        card.style.setProperty('--mouse-y', `${y}%`)
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [loading])

  return (
    <>
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <div className="app">
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  )
}

export default App
