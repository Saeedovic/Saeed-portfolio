import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Gamepad2, Code, Wrench, Trophy, Layers, Play, Download, Github } from 'lucide-react'
import { projects } from '../data/portfolio'
import './ProjectDetail.css'

function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <section className="section project-detail">
      <div className="container">
        <Link to="/projects" className="project-detail__back">
          <ArrowLeft size={18} />
          Back to Projects
        </Link>

        <div className="project-detail__header">
          <div className="project-detail__header-left">
            <div className="project-detail__icon">
              <Gamepad2 size={28} />
            </div>
            <div>
              <h1 className="project-detail__title">{project.name}</h1>
              <p className="project-detail__tagline">{project.tagline}</p>
            </div>
          </div>
          <div className="project-detail__role-badge">
            {project.role}
          </div>
        </div>

        <div className="project-detail__description">
          <p>{project.description}</p>
        </div>

        {/* Links Section - Trailer, Build, GitHub */}
        {(project.trailerUrl || project.buildUrl || project.githubUrl) && (
          <div className="project-detail__links">
            {project.trailerUrl && (
              <a
                href={project.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary project-detail__link-btn"
              >
                <Play size={18} />
                Watch Trailer
              </a>
            )}
            {project.buildUrl && (
              <a
                href={project.buildUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary project-detail__link-btn"
              >
                <Download size={18} />
                Download Build
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary project-detail__link-btn"
              >
                <Github size={18} />
                View Source
              </a>
            )}
          </div>
        )}

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="project-detail__gallery">
            <div className="project-detail__gallery-grid">
              {project.images.map((image, i) => (
                <div key={i} className="project-detail__gallery-item">
                  <img src={image} alt={`${project.name} screenshot ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="project-detail__tech-stack">
            {project.technologies.map((tech) => (
              <span key={tech} className="project-detail__tech-tag">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Detail Sections */}
        <div className="project-detail__grid">
          {project.responsibilities && project.responsibilities.length > 0 && (
            <div className="project-detail__section">
              <div className="project-detail__section-header">
                <Layers size={20} />
                <h3>Responsibilities</h3>
              </div>
              <ul className="project-detail__list">
                {project.responsibilities.map((item, i) => (
                  <li key={i} className="project-detail__list-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.gameplaySystems && project.gameplaySystems.length > 0 && (
            <div className="project-detail__section">
              <div className="project-detail__section-header">
                <Gamepad2 size={20} />
                <h3>Gameplay Systems</h3>
              </div>
              <ul className="project-detail__list">
                {project.gameplaySystems.map((item, i) => (
                  <li key={i} className="project-detail__list-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.technicalSystems && project.technicalSystems.length > 0 && (
            <div className="project-detail__section">
              <div className="project-detail__section-header">
                <Code size={20} />
                <h3>Technical Systems</h3>
              </div>
              <ul className="project-detail__list">
                {project.technicalSystems.map((item, i) => (
                  <li key={i} className="project-detail__list-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.tools && project.tools.length > 0 && (
            <div className="project-detail__section">
              <div className="project-detail__section-header">
                <Wrench size={20} />
                <h3>Tools & Technologies</h3>
              </div>
              <ul className="project-detail__list">
                {project.tools.map((item, i) => (
                  <li key={i} className="project-detail__list-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Results & Impact */}
        {project.results && project.results.length > 0 && (
          <div className="project-detail__results">
            <div className="project-detail__results-header">
              <Trophy size={20} />
              <h3>Results & Impact</h3>
            </div>
            <ul className="project-detail__results-list">
              {project.results.map((item, i) => (
                <li key={i} className="project-detail__result">
                  <span className="project-detail__result-icon">▹</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectDetail