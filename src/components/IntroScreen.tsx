import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import './IntroScreen.css'

interface IntroScreenProps {
  onEnter: () => void
}

function IntroScreen({ onEnter }: IntroScreenProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="intro__bg" />
        <div className="intro__content">
          <motion.div
            className="intro__brand"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Saeed Abdellah
          </motion.div>

          <motion.div
            className="intro__rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.h1
            className="intro__title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Gameplay Programmer | Game Designer
          </motion.h1>

          <motion.p
            className="intro__tagline"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8 }}
          >
            Crafting gameplay, systems, and experiences.
          </motion.p>

          <motion.div
            className="intro__actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
          >
            <motion.button
              className="intro__enter-btn"
              onClick={onEnter}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Sparkles size={18} />
              Enter Portfolio
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default IntroScreen
