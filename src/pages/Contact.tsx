import { Mail, MapPin, Github, Linkedin, Send, Phone } from 'lucide-react'
import { personalInfo } from '../data/portfolio'
import './Contact.css'

function Contact() {
  return (
    <section className="section contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Interested in working together or have a question? Feel free to reach out.
        </p>

        <div className="contact__grid">
          <div className="contact__info">
            <h3 className="contact__info-title">Contact Information</h3>
            <p className="contact__info-text">
              I'm currently open to game development opportunities, collaborations, and interesting projects.
            </p>

            <div className="contact__details">
              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="contact__detail-label">Email</span>
                  <a href={`mailto:${personalInfo.email}`} className="contact__detail-value">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="contact__detail-label">Phone</span>
                  <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} className="contact__detail-value">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="contact__detail-label">Location</span>
                  <span className="contact__detail-value">{personalInfo.location}</span>
                </div>
              </div>

              {personalInfo.github && (
                <div className="contact__detail">
                  <div className="contact__detail-icon">
                    <Github size={20} />
                  </div>
                  <div>
                    <span className="contact__detail-label">GitHub</span>
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact__detail-value"
                    >
                      {personalInfo.github}
                    </a>
                  </div>
                </div>
              )}

              {personalInfo.linkedin && (
                <div className="contact__detail">
                  <div className="contact__detail-icon">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <span className="contact__detail-label">LinkedIn</span>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact__detail-value"
                    >
                      {personalInfo.linkedin}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="contact__form-wrapper">
            <form className="contact__form" onSubmit={(e) => e.preventDefault()}>
              <div className="contact__form-group">
                <label htmlFor="name" className="contact__form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  className="contact__form-input"
                  placeholder="Your name"
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="email" className="contact__form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="contact__form-input"
                  placeholder="your@email.com"
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="subject" className="contact__form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="contact__form-input"
                  placeholder="What's this about?"
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="message" className="contact__form-label">Message</label>
                <textarea
                  id="message"
                  className="contact__form-textarea"
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                />
              </div>

              <a
                href={`mailto:${personalInfo.email}`}
                className="btn btn--primary contact__form-submit"
              >
                <Send size={18} />
                Send Message
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact