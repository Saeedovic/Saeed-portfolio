import { Download, GraduationCap, Award, Briefcase, Phone, Mail, MapPin, Github, Linkedin } from 'lucide-react'
import { experience, education, achievements, personalInfo } from '../data/portfolio'
import './CV.css'

function CV() {
  return (
    <section className="section cv">
      <div className="container">
        <h2 className="section-title">Resume</h2>
        <p className="section-subtitle">
          A comprehensive overview of my professional background, education, and achievements.
        </p>

        <div className="cv__actions">
          <a href="/cv.pdf" download className="btn btn--primary" id="cv-download-link">
            <Download size={18} />
            Download CV (PDF)
          </a>
        </div>

        <div className="cv__content">
          {/* Contact Information */}
          <div className="cv__section">
            <div className="cv__section-header">
              <Mail size={22} />
              <h3>Contact Information</h3>
            </div>
            <div className="cv__section-content">
              <div className="cv__contact-grid">
                <div className="cv__contact-item">
                  <Mail size={16} />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="cv__contact-item">
                  <Phone size={16} />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="cv__contact-item">
                  <MapPin size={16} />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="cv__contact-item">
                  <Github size={16} />
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                    {personalInfo.github}
                  </a>
                </div>
                <div className="cv__contact-item">
                  <Linkedin size={16} />
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                    {personalInfo.linkedin}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="cv__section">
            <div className="cv__section-header">
              <Briefcase size={22} />
              <h3>Professional Summary</h3>
            </div>
            <div className="cv__section-content">
              <p className="cv__summary">
                {personalInfo.summary}
              </p>
            </div>
          </div>

          {/* Experience Section */}
          <div className="cv__section">
            <div className="cv__section-header">
              <Briefcase size={22} />
              <h3>Professional Experience</h3>
            </div>
            <div className="cv__section-content">
              {experience.map((job) => (
                <div key={job.id} className="cv__item">
                  <div className="cv__item-header">
                    <div>
                      <h4 className="cv__item-title">{job.role}</h4>
                      <p className="cv__item-subtitle">{job.company}</p>
                    </div>
                    <div className="cv__item-meta">
                      <span className="cv__item-date">{job.startDate} — {job.endDate}</span>
                      <span className="cv__item-location">{job.location}</span>
                    </div>
                  </div>
                  <ul className="cv__item-list">
                    {job.responsibilities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="cv__section">
            <div className="cv__section-header">
              <GraduationCap size={22} />
              <h3>Education</h3>
            </div>
            <div className="cv__section-content">
              {education.map((edu, i) => (
                <div key={i} className="cv__item">
                  <div className="cv__item-header">
                    <div>
                      <h4 className="cv__item-title">{edu.degree}</h4>
                      <p className="cv__item-subtitle">{edu.school}</p>
                    </div>
                    <span className="cv__item-date">{edu.year}</span>
                  </div>
                  {edu.description && <p className="cv__item-desc">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="cv__section">
            <div className="cv__section-header">
              <Award size={22} />
              <h3>Achievements & Awards</h3>
            </div>
            <div className="cv__section-content">
              <ul className="cv__achievements-list">
                {achievements.map((item, i) => (
                  <li key={i} className="cv__achievement">
                    <span className="cv__achievement-icon">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Languages Section */}
          <div className="cv__section">
            <div className="cv__section-header">
              <Award size={22} />
              <h3>Languages</h3>
            </div>
            <div className="cv__section-content">
              <div className="cv__languages">
                <div className="cv__language">
                  <span className="cv__language-name">Arabic</span>
                  <span className="cv__language-level">Fluent</span>
                </div>
                <div className="cv__language">
                  <span className="cv__language-name">English</span>
                  <span className="cv__language-level">Fluent</span>
                </div>
                <div className="cv__language">
                  <span className="cv__language-name">French</span>
                  <span className="cv__language-level">Basic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CV