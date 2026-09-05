import { Gamepad2, Code, Cpu, Settings } from 'lucide-react'
import { skills } from '../data/portfolio'
import './Skills.css'

const categoryIcons: Record<string, typeof Gamepad2> = {
  'Game Engines': Gamepad2,
  'Programming': Code,
  'Systems & Architecture': Cpu,
  'Tools & Workflow': Settings,
}

function Skills() {
  return (
    <section className="section skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">
          Technical competencies and proficiency levels across game development disciplines.
        </p>

        <div className="skills__grid">
          {skills.map((category) => {
            const Icon = categoryIcons[category.name] || Code
            return (
              <div key={category.name} className="skills__category">
                <div className="skills__category-header">
                  <div className="skills__category-icon">
                    <Icon size={22} />
                  </div>
                  <h3 className="skills__category-name">{category.name}</h3>
                </div>

                <div className="skills__list">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="skill-item">
                      <div className="skill-item__header">
                        <span className="skill-item__name">{skill.name}</span>
                        <span className="skill-item__level">{skill.level}%</span>
                      </div>
                      <div className="skill-item__bar">
                        <div
                          className="skill-item__fill"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills