import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <span className="footer__logo">
              <span style={{ color: '#00f5ff' }}>&lt;</span>
              <span className="gradient-text">Sahil Vaghela</span>
              <span style={{ color: '#00f5ff' }}>/&gt;</span>
            </span>
            <p className="footer__tagline">
              Building the future, one line of code at a time.
            </p>
          </div>

          <div className="footer__socials">
            <a
              href="https://github.com/SahilVaghela07"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-icon"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/sahil-vaghela-022750307"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-icon"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a
              href="mailto:sahilsvaghela007@gmail.com"
              className="footer__social-icon"
              aria-label="Email"
            >
              <FiMail />
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} Sahil Vaghela. Made with{' '}
            <FiHeart className="footer__heart" /> and React + Three.js
          </p>
        </div>
      </div>
    </footer>
  )
}
