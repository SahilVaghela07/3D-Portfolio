import { useRef, useState, useCallback } from 'react'

export default function TiltCard({ children, className = '', intensity = 12, glowColor = 'rgba(0, 217, 146, 0.15)', disabled = false }) {
  const cardRef = useRef(null)
  const [style, setStyle] = useState({})
  const rafRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (disabled || !cardRef.current) return

    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -intensity
      const rotateY = ((x - centerX) / centerX) * intensity

      // Shine & glow positions
      const shineX = (x / rect.width) * 100
      const shineY = (y / rect.height) * 100

      // Edge glow angle
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 180

      setStyle({
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: 'transform 0.1s ease-out',
        '--shine-x': `${shineX}%`,
        '--shine-y': `${shineY}%`,
        '--glow-angle': `${angle}deg`,
        '--mouse-x': `${shineX}%`,
        '--mouse-y': `${shineY}%`,
      })
    })
  }, [disabled, intensity])

  const handleMouseLeave = useCallback(() => {
    if (disabled) return

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.03, 0.98, 0.52, 0.99)',
      '--shine-x': '50%',
      '--shine-y': '50%',
      '--glow-angle': '0deg',
      '--mouse-x': '50%',
      '--mouse-y': '50%',
    })
  }, [disabled])

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      style={disabled ? undefined : style}
      onMouseMove={disabled ? undefined : handleMouseMove}
      onMouseLeave={disabled ? undefined : handleMouseLeave}
    >
      <div className="tilt-card__shine" />
      <div className="tilt-card__edge-glow" />
      {children}
    </div>
  )
}
