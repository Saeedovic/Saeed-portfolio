import { Link } from 'react-router-dom'
import { ArrowRight, Gamepad2 } from 'lucide-react'
import { projects } from '../data/portfolio'
import './Projects.css'

function Projects() {
  // One continuous list of actual game projects.
  // Excludes professional experience entries (category 'vr-mr').
  // Content Creator Mansion (category 'featured') is included as a game.
  const gameProjects = projects.filter(
    (p) => p.category === 'game' || p.id === 'content-creator-mansion'
  )

  return (
    <section className="section projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">
          Game development projects showcasing gameplay systems, technical
          architecture, and development tools.
        </p>

        <div className="projects__grid">
          {gameProjects.map((project) => (
            <Link
              to={`/projects/${project.id}`}
              key={project.id}
              className="project-card"
            >
              <div className="project-card__header">
                <div className="project-card__icon">
                  <Gamepad2 size={24} />
                </div>
                <div className="project-card__meta">
                  <span className="project-card__role">{project.role}</span>
                </div>
              </div>

              <h3 className="project-card__name">{project.name}</h3>
              <p className="project-card__tagline">{project.tagline}</p>

              <div className="project-card__tech">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="project-card__tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-card__footer">
                <span className="project-card__link">
                  View Details
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
