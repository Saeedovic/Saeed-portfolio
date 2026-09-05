import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { moveInput } from './InteractiveWorld'
import './WorldHUD.css'

interface WorldHUDProps {
  isMobile: boolean
  nearbyLabel: string | null
  onInteract: () => void
}

function WorldHUD({ isMobile, nearbyLabel, onInteract }: WorldHUDProps) {
  const [joystickDelta, setJoystickDelta] = useState({ x: 0, y: 0 })
  const joystickRef = useRef<HTMLDivElement>(null)
  const active = useRef(false)
  const center = useRef({ x: 0, y: 0 })

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation()
    const touch = e.touches[0]
    if (joystickRef.current) {
      const rect = joystickRef.current.getBoundingClientRect()
      center.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      active.current = true
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation()
    if (!active.current) return
    const touch = e.touches[0]
    const dx = touch.clientX - center.current.x
    const dy = touch.clientY - center.current.y
    const maxDist = 38
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDist)
    const angle = Math.atan2(dy, dx)
    const ox = Math.cos(angle) * dist
    const oy = Math.sin(angle) * dist
    setJoystickDelta({ x: ox, y: oy })
    // Feed the world controller (screen-space: up = forward/away from camera)
    moveInput.x = ox / maxDist
    moveInput.y = oy / maxDist
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation()
    active.current = false
    setJoystickDelta({ x: 0, y: 0 })
    moveInput.x = 0
    moveInput.y = 0
  }

  return (
    <div className="world-hud">
      {/* Interaction prompt */}
      <AnimatePresence>
        {nearbyLabel && (
          <motion.div
            className="world-hud__prompt"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {!isMobile && <span className="world-hud__prompt-key">E</span>}
            <span className="world-hud__prompt-text">{nearbyLabel}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile joystick */}
      {isMobile && (
        <div className="world-hud__joystick-area">
          <div
            ref={joystickRef}
            className="world-hud__joystick"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            <div
              className="world-hud__joystick-knob"
              style={{ transform: `translate(${joystickDelta.x}px, ${joystickDelta.y}px)` }}
            />
          </div>
        </div>
      )}

      {/* Mobile interact button */}
      {isMobile && nearbyLabel && (
        <button className="world-hud__interact-btn" onClick={onInteract}>
          INTERACT
        </button>
      )}
    </div>
  )
}

export default WorldHUD