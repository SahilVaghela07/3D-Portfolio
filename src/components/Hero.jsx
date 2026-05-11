import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiArrowDown } from 'react-icons/fi'
import HeroScene from './canvas/HeroScene'
import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <HeroScene />

      <div className="hero__content">
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="hero__badge-dot" />
          <span>Available for opportunities</span>
        </motion.div>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Hi, I'm{' '}
          <span className="hero__name">Sahil Vaghela</span>
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Engineering Student & Developer
        </motion.p>

        <motion.p
          className="hero__description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Excited to learn and teach new things. Always ready to build and 
          create something amazing. Currently pursuing engineering at 
          <span className="hero__highlight"> G.H. Patel College of Engineering & Technology</span>.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <Link to="projects" smooth duration={500} offset={-80}>
            <button className="btn-primary" id="hero-explore-btn">
              Explore My Work
            </button>
          </Link>
          <Link to="contact" smooth duration={500} offset={-80}>
            <button className="btn-outline" id="hero-contact-btn">
              Get In Touch
            </button>
          </Link>
        </motion.div>

        <motion.div
          className="hero__scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <Link to="about" smooth duration={500} offset={-80}>
            <div className="hero__scroll-mouse">
              <div className="hero__scroll-dot" />
            </div>
            <FiArrowDown className="hero__scroll-arrow" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
