import { User, Code, Gamepad2, Wrench, Zap } from 'lucide-react'
import { aboutMe, personalInfo } from '../data/portfolio'
import './About.css'

const highlightIcons = [Gamepad2, Code, Wrench, Zap, User]

function About() {
  return (
    <section className="section about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          A closer look at who I am and what drives my work in game development.
        </p>

        <div className="about__grid">
          <div className="about__bio">
            {aboutMe.bio.split('\n\n').map((paragraph, i) => (
              <p key={i} className="about__bio-text">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="about__highlights">
            <h3 className="about__highlights-title">What I Bring</h3>
            <ul className="about__highlights-list">
              {aboutMe.highlights.map((highlight, i) => {
                const Icon = highlightIcons[i % highlightIcons.length]
                return (
                  <li key={i} className="about__highlight">
                    <div className="about__highlight-icon">
                      <Icon size={20} />
                    </div>
                    <span>{highlight}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="about__info">
          <div className="about__info-item">
            <span className="about__info-label">Location</span>
            <span className="about__info-value">{personalInfo.location}</span>
          </div>
          <div className="about__info-item">
            <span className="about__info-label">Focus</span>
            <span className="about__info-value">Unity / C# / Gameplay Systems</span>
          </div>
          <div className="about__info-item">
            <span className="about__info-label">Status</span>
            <span className="about__info-value about__info-value--available">
              Open to opportunities
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About