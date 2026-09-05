import { Github, Linkedin, Mail } from 'lucide-react'
import { personalInfo } from '../data/portfolio'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__brand">
            <span className="footer__logo">
              {'<'}SA{' />'}
            </span>
            <p className="footer__tagline">
              Game Programmer & Game Designer — Building interactive experiences with Unity & C#.
            </p>
          </div>

          <div className="footer__social">
            {personalInfo.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            )}
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            )}
            <a
              href={`mailto:${personalInfo.email}`}
              className="footer__social-link"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer