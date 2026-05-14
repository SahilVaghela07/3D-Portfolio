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
        <div className="loader__shapes">
          <div className="loader__shape loader__shape--1" />
          <div className="loader__shape loader__shape--2" />
          <div className="loader__shape loader__shape--3" />
        </div>
        <p className="loader__text">
          <span className="gradient-text">Loading Experience</span>
        </p>
      </motion.div>
    </div>
  )
}
