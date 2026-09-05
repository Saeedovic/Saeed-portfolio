import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import IntroScreen from '../components/IntroScreen'
import InteractiveWorld from '../components/World/InteractiveWorld'
import './Home.css'

function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [enteredPortfolio, setEnteredPortfolio] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleEnter = useCallback(() => {
    setShowIntro(false)
    setEnteredPortfolio(true)
  }, [])

  const handleSkip = useCallback(() => {
    setShowIntro(false)
  }, [])

  const handleNavigate = useCallback(
    (section: string) => {
      navigate(`/${section}`)
    },
    [navigate]
  )

  return (
    <section className="hero">
      {showIntro && <IntroScreen onEnter={handleEnter} onSkip={handleSkip} />}

      {enteredPortfolio && (
        <div className="hero__interactive">
          <InteractiveWorld onNavigate={handleNavigate} isMobile={isMobile} />
        </div>
      )}

      {!showIntro && !enteredPortfolio && (
        <div className="hero__fallback">
          <div className="hero__content">
            <h1 className="hero__title">
              <span className="hero__title-line">Hi, I'm</span>
              <span className="hero__title-name">Saeed Abdellah</span>
            </h1>
            <p className="hero__subtitle">Game Developer</p>
            <p className="hero__description">
              Explore my portfolio to see my game development projects, technical skills, and
              professional experience.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Home