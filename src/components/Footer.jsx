import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <span className="footer__logo">
              <span className="footer__logo-mark">SV</span>
              <span>Sahil Vaghela</span>
            </span>
            <p className="footer__tagline">
              Engineering student, developer, and lifelong learner.
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
            © {year} Sahil Vaghela. Built with React and Three.js.
          </p>
        </div>
      </div>
    </footer>
  )
}
