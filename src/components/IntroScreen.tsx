import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Keyboard, Smartphone } from 'lucide-react'
import './IntroScreen.css'

interface IntroScreenProps {
  onEnter: () => void
  onSkip: () => void
}

function IntroScreen({ onEnter, onSkip }: IntroScreenProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="intro__bg" />
        <div className="intro__content">
          <motion.div
            className="intro__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="intro__badge-dot" />
            Game Developer Portfolio
          </motion.div>

          <motion.h1
            className="intro__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            SAEED ABDELLAH
          </motion.h1>

          <motion.p
            className="intro__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            GAME DEVELOPER
          </motion.p>

          <motion.p
            className="intro__tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Explore my work
          </motion.p>

          <motion.div
            className="intro__controls"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            {isMobile ? (
              <div className="intro__controls-info">
                <Smartphone size={18} />
                <span>TOUCH TO EXPLORE</span>
                <span className="intro__controls-sep">•</span>
                <span>Drag to move</span>
                <span className="intro__controls-sep">•</span>
                <span>Tap to interact</span>
              </div>
            ) : (
              <div className="intro__controls-info">
                <Keyboard size={18} />
                <span>WASD / ARROW KEYS TO MOVE</span>
                <span className="intro__controls-sep">•</span>
                <span>E / CLICK TO INTERACT</span>
              </div>
            )}
          </motion.div>

          <motion.button
            className="intro__enter-btn"
            onClick={onEnter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ENTER PORTFOLIO
          </motion.button>

          <motion.button
            className="intro__skip-btn"
            onClick={onSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            SKIP EXPLORATION
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default IntroScreen