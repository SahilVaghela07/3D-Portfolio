import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { FiGithub } from 'react-icons/fi'
import './Navbar.css'

const navLinks = [
  { id: 'home', title: 'Home' },
  { id: 'about', title: 'About' },
  { id: 'projects', title: 'Projects' },
  { id: 'skills', title: 'Skills' },
  { id: 'contact', title: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar__container">
        <Link to="home" smooth duration={500} className="navbar__logo">
          <span className="navbar__logo-mark">SV</span>
          <span className="navbar__logo-text">Sahil Vaghela</span>
        </Link>

        <ul className="navbar__links">
          {navLinks.map((link, index) => (
            <motion.li
              key={link.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                to={link.id}
                smooth
                duration={500}
                spy
                offset={-80}
                activeClass="active"
                className="navbar__link"
              >
                {link.title}
              </Link>
            </motion.li>
          ))}
        </ul>

        <a
          href="https://github.com/SahilVaghela07"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar__repo-link"
        >
          <FiGithub />
          <span>GitHub</span>
        </a>

        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                className="navbar__mobile-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                className="navbar__mobile-menu"
                initial={{ opacity: 0, x: 100, rotateY: -10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: 100, rotateY: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Link
                      to={link.id}
                      smooth
                      duration={500}
                      spy
                      offset={-80}
                      className="navbar__mobile-link"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="navbar__mobile-link-number">{String(index + 1).padStart(2, '0')}</span>
                      {link.title}
                    </Link>
                  </motion.div>
                ))}
                <a
                  href="https://github.com/SahilVaghela07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar__mobile-cta"
                >
                  <FiGithub />
                  <span>GitHub Profile</span>
                </a>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
