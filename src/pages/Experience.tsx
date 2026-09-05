import { Briefcase, Calendar, MapPin } from 'lucide-react'
import { experience } from '../data/portfolio'
import './Experience.css'

function Experience() {
  return (
    <section className="section experience">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">
          My professional journey in game development and software engineering.
        </p>

        <div className="experience__timeline">
          {experience.map((job) => (
            <div key={job.id} className="experience__item">
              <div className="experience__marker">
                <div className="experience__marker-dot" />
                <div className="experience__marker-line" />
              </div>

              <div className="experience__card">
                <div className="experience__card-header">
                  <div className="experience__card-left">
                    <h3 className="experience__role">{job.role}</h3>
                    <p className="experience__company">{job.company}</p>
                  </div>
                  <div className="experience__card-meta">
                    <span className="experience__date">
                      <Calendar size={14} />
                      {job.startDate} — {job.endDate}
                    </span>
                    <span className="experience__location">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                  </div>
                </div>

                <p className="experience__description">{job.description}</p>

                <div className="experience__responsibilities">
                  <h4 className="experience__subtitle">
                    <Briefcase size={16} />
                    Key Responsibilities
                  </h4>
                  <ul className="experience__list">
                    {job.responsibilities.map((item, i) => (
                      <li key={i} className="experience__list-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="experience__tech">
                  {job.technologies.map((tech) => (
                    <span key={tech} className="experience__tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience