import { motion } from 'framer-motion'
import './Loader.css'

export default function Loader() {
  return (
    <div className="loader">
      <motion.div className="loader__content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="loader__terminal">
          <span className="loader__prompt">$</span>
          <span>boot portfolio</span>
          <span className="loader__caret" />
        </div>
        <p className="loader__text">
          Loading experience
        </p>
      </motion.div>
    </div>
  )
}
