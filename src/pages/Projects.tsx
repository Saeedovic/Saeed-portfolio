import { Link } from 'react-router-dom'
import { ArrowRight, Gamepad2, Star, Glasses } from 'lucide-react'
import { projects } from '../data/portfolio'
import './Projects.css'

function Projects() {
  const featuredProjects = projects.filter((p) => p.category === 'featured')
  const vrMrProjects = projects.filter((p) => p.category === 'vr-mr')
  const gameProjects = projects.filter((p) => p.category === 'game')

  return (
    <section className="section projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">
          Game development projects showcasing gameplay systems, technical architecture, and development tools.
        </p>

        {/* Featured / Professional Work */}
        {featuredProjects.length > 0 && (
          <div className="projects__section">
            <div className="projects__section-header">
              <Star size={20} />
              <h3>Featured Professional Work</h3>
            </div>
            <div className="projects__grid projects__grid--featured">
              {featuredProjects.map((project) => (
                <Link
                  to={`/projects/${project.id}`}
                  key={project.id}
                  className="project-card project-card--featured"
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
        )}

        {/* VR / Mixed Reality */}
        {vrMrProjects.length > 0 && (
          <div className="projects__section">
            <div className="projects__section-header">
              <Glasses size={20} />
              <h3>VR & Mixed Reality Experience</h3>
            </div>
            <div className="projects__grid">
              {vrMrProjects.map((project) => (
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
        )}

        {/* Game Projects */}
        {gameProjects.length > 0 && (
          <div className="projects__section">
            <div className="projects__section-header">
              <Gamepad2 size={20} />
              <h3>Game Projects</h3>
            </div>
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
        )}
      </div>
    </section>
  )
}

export default Projects