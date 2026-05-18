import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiArrowUpRight, FiClock, FiCheck } from 'react-icons/fi'
import TiltCard from './TiltCard'
import './Contact.css'

const CONTACT_EMAIL = 'sahilsvaghela007@gmail.com'
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`
const STATUS_RESET_DELAY = 5000

function hasEmailJsConfig() {
  return Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY)
}

function buildMailtoUrl(form) {
  const subject = `Portfolio message from ${form.from_name}`
  const body = [
    `Name: ${form.from_name}`,
    `Email: ${form.from_email}`,
    '',
    'Message:',
    form.message,
  ].join('\n')

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

async function sendWithEmailJs(formElement) {
  await emailjs.sendForm(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    formElement,
    EMAILJS_PUBLIC_KEY
  )
}

async function sendWithFormSubmit(form) {
  const subject = `Portfolio message from ${form.from_name}`
  const response = await fetch(FORMSUBMIT_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: form.from_name,
      email: form.from_email,
      message: form.message,
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
    }),
  })

  if (!response.ok) {
    throw new Error('FormSubmit request failed.')
  }
}

export default function Contact() {
  const [form, setForm] = useState({ from_name: '', from_email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const resetStatus = () => {
    setTimeout(() => {
      setStatus('idle')
      setFeedback('')
    }, STATUS_RESET_DELAY)
  }

  const markSent = () => {
    setForm({ from_name: '', from_email: '', message: '' })
    setStatus('sent')
    setFeedback('Thanks. Your message is on its way.')
    resetStatus()
  }

  const openEmailDraft = () => {
    window.location.href = buildMailtoUrl(form)
    setStatus('fallback')
    setFeedback('Your email app opened with this message filled in. Press send there to finish.')
    resetStatus()
  }

  const sendEmail = async (e) => {
    e.preventDefault()

    const formElement = e.currentTarget

    setStatus('sending')
    setFeedback('')

    if (hasEmailJsConfig()) {
      try {
        await sendWithEmailJs(formElement)
        formElement.reset()
        markSent()
        return
      } catch {
        setFeedback('')
      }
    }

    try {
      await sendWithFormSubmit(form)
      markSent()
    } catch {
      openEmailDraft()
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="subtitle">Let's Connect</span>
          <h2>Contact Me</h2>
          <div className="divider" />
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          className="contact__cta-banner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="contact__cta-text">
            Building something ambitious and need a <span>driven, fast-learning collaborator</span>? Let's talk.
          </p>
        </motion.div>

        <div className="contact__layout">
          {/* Info Side */}
          <motion.div
            className="contact__info-wrapper"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <TiltCard className="contact__info-tilt" intensity={6}>
              <div className="contact__info">
                <h3 className="contact__info-title">
                  Open to internships, collaborations, and useful web ideas.
                </h3>
                <p className="contact__info-text">
                  Send a note if you want to discuss a project, an opportunity, or a
                  technical idea worth building. I approach every conversation with context and next steps.
                </p>

                <div className="contact__details">
                  <div className="contact__detail-item">
                    <div className="contact__detail-icon">
                      <FiMail />
                    </div>
                    <div>
                      <span className="contact__detail-label">Email</span>
                      <a href="mailto:sahilsvaghela007@gmail.com" className="contact__detail-value">
                        sahilsvaghela007@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="contact__detail-item">
                    <div className="contact__detail-icon">
                      <FiMapPin />
                    </div>
                    <div>
                      <span className="contact__detail-label">Location</span>
                      <span className="contact__detail-value">Gujarat, India · Open to Remote</span>
                    </div>
                  </div>

                  <div className="contact__detail-item">
                    <div className="contact__detail-icon contact__detail-icon--clock">
                      <FiClock />
                    </div>
                    <div>
                      <span className="contact__detail-label">Response Time</span>
                      <span className="contact__detail-value">Typically within 24 hours</span>
                    </div>
                  </div>
                </div>

                <div className="contact__socials">
                  <a
                    href="https://github.com/SahilVaghela07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-link"
                  >
                    <FiGithub />
                    <span>GitHub</span>
                    <FiArrowUpRight className="contact__social-arrow" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sahil-vaghela-022750307"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-link"
                  >
                    <FiLinkedin />
                    <span>LinkedIn</span>
                    <FiArrowUpRight className="contact__social-arrow" />
                  </a>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Form Side */}
          <motion.div
            className="contact__form-wrapper"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <TiltCard className="contact__form-tilt" intensity={5} disabled>
              <form
                id="contact-form"
                className="contact__form glass-card"
                onSubmit={sendEmail}
              >
                <div className="contact__form-header">
                  <span className="contact__form-label">Send a Message</span>
                  <span className="contact__form-dot" />
                </div>

                <input type="hidden" name="to_email" value={CONTACT_EMAIL} readOnly />
                <input type="hidden" name="reply_to" value={form.from_email} readOnly />

                <div className="contact__form-group">
                  <label htmlFor="contact-name">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="from_name"
                    placeholder="John Doe"
                    value={form.from_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact__form-group">
                  <label htmlFor="contact-email">Your Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="from_email"
                    placeholder="john@example.com"
                    value={form.from_email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact__form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    placeholder="Hi Sahil, I'd love to discuss..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={`btn-primary contact__submit ${status === 'sent' ? 'contact__submit--sent' : ''} ${status === 'fallback' ? 'contact__submit--fallback' : ''}`}
                  id="submit-btn"
                  disabled={status === 'sending' || status === 'sent'}
                >
                  {status === 'sending' ? (
                    <span className="contact__sending">
                      <span className="contact__spinner" />
                      Sending...
                    </span>
                  ) : status === 'sent' ? (
                    <span><FiCheck /> Message Sent</span>
                  ) : status === 'fallback' ? (
                    <span><FiMail /> Email Draft Opened</span>
                  ) : (
                    <>
                      <FiSend />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
                {feedback ? (
                  <p className="contact__feedback">{feedback}</p>
                ) : null}
              </form>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
