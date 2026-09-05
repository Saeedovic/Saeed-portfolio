import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Gamepad2, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import IntroScreen from '../components/IntroScreen'
import { personalInfo, projects, aboutMe, skills, experience } from '../data/portfolio'
import './Home.css'

const EASE = [0.22, 1, 0.36, 1] as const

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

const reveal = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
}

function Home() {
  const [entered, setEntered] = useState(() => sessionStorage.getItem('enteredPortfolio') === 'true')

  useEffect(() => {
    if (entered) sessionStorage.setItem('enteredPortfolio', 'true')
  }, [entered])

  const gameImages: Record<string, string> = {
    'content-creator-mansion': '/images/games/Content-Creator-Mansion.jfif',
    'lost-robot': '/images/games/Lost-Robo.png',
    'party-time': '/images/games/Party-Time.png',
    'back-to-safety': '/images/games/Back-To-safety.png',
    'shaytan-kids': '/images/games/Shaytan-Kids.png',
  }
  const games = projects.filter((p) => p.category === 'game' || p.id === 'content-creator-mansion')
  const experiencePreview = experience.slice(0, 2)
  const skillHighlights = skills.slice(0, 3)

  return (
    <>
      {!entered && <IntroScreen onEnter={() => setEntered(true)} />}

      <motion.main
        className="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ duration: 0.9, delay: entered ? 0.25 : 0 }}
      >
        <div className="home__atmosphere" aria-hidden="true">
          <div className="atmo atmo--a" />
          <div className="atmo atmo--b" />
          <div className="atmo-grid" />
        </div>

        {/* HERO */}
        <section className="hero">
          <div className="hero__visual" aria-hidden="true">
            <div className="hero__orb" />
            <div className="hero__ring hero__ring--1" />
            <div className="hero__ring hero__ring--2" />
            <div className="hero__beam" />
          </div>

          <motion.div className="hero__inner" variants={container} initial="hidden" animate="show">
            <motion.div className="hero__eyebrow" variants={item}>
              <span className="hero__pulse" />
              {personalInfo.location}
            </motion.div>

            <motion.h1 className="hero__name" variants={item}>
              {personalInfo.name}
            </motion.h1>

            <motion.p className="hero__title" variants={item}>
              Gameplay Programmer <span className="hero__sep">|</span> Game Designer
            </motion.p>

            <motion.p className="hero__summary" variants={item}>
              {personalInfo.summary.split('.')[0]}.
            </motion.p>

            <motion.div className="hero__actions" variants={item}>
              <Link to="/projects" className="btn btn--primary">
                View Projects <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn--ghost">
                Contact Me
              </Link>
            </motion.div>

            <motion.div className="hero__links" variants={item}>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${personalInfo.email}`} aria-label="Email">
                <Mail size={18} />
              </a>
              <span className="hero__location">
                <MapPin size={14} /> {personalInfo.location}
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.9 }}
          >
            <span /> Scroll
          </motion.div>
        </section>
        {/* GAMES */}
        <section className="games">
          <motion.div
            className="section-head"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={container}
          >
            <motion.span className="section-head__kicker" variants={item}>Games</motion.span>
            <motion.h2 className="section-head__title" variants={item}>
              Games I have worked on
            </motion.h2>
          </motion.div>

          <div className="games__list">
            {games.map((project, i) => {
              const image = gameImages[project.id]
              return (
                <motion.article
                  key={project.id}
                  className={[
                    'showcase',
                    image && i % 2 === 1 ? 'showcase--flip' : '',
                    !image ? 'showcase--textonly' : '',
                  ].join(' ').trim()}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={container}
                >
                  {image && (
                    <motion.div className="showcase__media" variants={item}>
                      <Link to={`/projects/${project.id}`} className="showcase__media-link">
                        <img src={image} alt={project.name} loading="lazy" />
                        <span className="showcase__media-glow" aria-hidden="true" />
                      </Link>
                    </motion.div>
                  )}

                  <motion.div className="showcase__body" variants={item}>
                    <span className="showcase__tag">{project.tagline}</span>
                    <h3 className="showcase__name">{project.name}</h3>
                    <p className="showcase__role">
                      <Gamepad2 size={14} /> {project.role}
                    </p>
                    <p className="showcase__desc">{project.description.split('.')[0]}.</p>
                    {project.technologies.length > 0 && (
                      <div className="showcase__tech">
                        {project.technologies.slice(0, 6).map((tech) => (
                          <span key={tech} className="tech-chip">{tech}</span>
                        ))}
                      </div>
                    )}
                    <Link to={`/projects/${project.id}`} className="btn btn--outline">
                      Open Project <ArrowRight size={15} />
                    </Link>
                  </motion.div>
                </motion.article>
              )
            })}
          </div>

          <motion.div
            className="games__all"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/projects" className="btn btn--ghost">
              All Projects <ArrowRight size={16} />
            </Link>
          </motion.div>
        </section>
        {/* EXPERIENCE / SKILLS */}
        <section className="capabilities">
          <motion.div
            className="section-head"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={container}
          >
            <motion.span className="section-head__kicker" variants={item}>Experience & Skills</motion.span>
            <motion.h2 className="section-head__title" variants={item}>What I bring to a team</motion.h2>
          </motion.div>

          <div className="capabilities__grid">
            <div className="capabilities__col">
              {experiencePreview.map((job) => (
                <motion.div
                  key={job.id}
                  className="xp-card"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={reveal}
                >
                  <div className="xp-card__period">{job.startDate} — {job.endDate}</div>
                  <h3 className="xp-card__role">{job.role}</h3>
                  <p className="xp-card__company">{job.company} · {job.location}</p>
                  <p className="xp-card__desc">{job.description}</p>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <Link to="/experience" className="text-link">Full experience <ArrowRight size={14} /></Link>
              </motion.div>
            </div>

            <div className="capabilities__col">
              {skillHighlights.map((category) => (
                <motion.div
                  key={category.name}
                  className="skill-group"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={reveal}
                >
                  <h4 className="skill-group__name">{category.name}</h4>
                  <div className="skill-group__chips">
                    {category.skills.slice(0, 4).map((skill) => (
                      <span key={skill.name} className="tech-chip">{skill.name}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <Link to="/skills" className="text-link">All skills <ArrowRight size={14} /></Link>
              </motion.div>
            </div>
          </div>
        </section>
        {/* PROFILE */}
        <section className="profile">
          <motion.div
            className="profile__inner"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={container}
          >
            <motion.span className="section-head__kicker" variants={item}>Profile</motion.span>
            <motion.h2 className="section-head__title" variants={item}>
              Gameplay Programmer <span className="hero__sep">|</span> Game Designer
            </motion.h2>
            <motion.p className="profile__text" variants={item}>
              {aboutMe.bio.split('\n')[0]}
            </motion.p>
            <motion.ul className="profile__highlights" variants={item}>
              {aboutMe.highlights.slice(0, 6).map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </motion.ul>
            <motion.div variants={item}>
              <Link to="/about" className="btn btn--ghost">More about me <ArrowRight size={15} /></Link>
            </motion.div>
          </motion.div>
        </section>

        {/* CONTACT */}
        <section className="contact">
          <motion.div
            className="contact__inner"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={container}
          >
            <motion.span className="section-head__kicker" variants={item}>Contact</motion.span>
            <motion.h2 className="contact__title" variants={item}>
              Let's build something players remember.
            </motion.h2>
            <motion.div className="contact__actions" variants={item}>
              <a href={`mailto:${personalInfo.email}`} className="btn btn--primary">
                <Mail size={16} /> {personalInfo.email}
              </a>
            </motion.div>
            <motion.div className="contact__links" variants={item}>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={18} /> LinkedIn
              </a>
              <a href={personalInfo.github} target="_blank" rel="noreferrer">
                <Github size={18} /> GitHub
              </a>
            </motion.div>
          </motion.div>
        </section>
      </motion.main>
    </>
  )
}

export default Home
