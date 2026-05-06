import { motion } from 'framer-motion'
import { ArrowRight, BriefcaseBusiness } from 'lucide-react'
import { useState } from 'react'

export default function ScenarioIntro({ scenario, onContinue }) {
  const [imageSrc, setImageSrc] = useState(scenario.image.local)

  return (
    <motion.section className="scenario-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <img
        src={imageSrc}
        alt=""
        className="scenario-image"
        onError={() => {
          if (imageSrc !== scenario.image.remote) setImageSrc(scenario.image.remote)
        }}
      />
      <div className="image-scrim" />
      <div className="intro-content">
        <div className="scenario-meta">
          <span>{scenario.year}</span>
          <span>{scenario.sector}</span>
          <span>{scenario.cia.join(' / ')}</span>
        </div>
        <h2>{scenario.title}</h2>
        <p className="role-line"><BriefcaseBusiness size={16} /> {scenario.role}</p>
        <div className="intro-copy">
          {scenario.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="impact-grid">
          {scenario.impactStats.map((stat) => (
            <div className="impact-stat" key={`${stat.value}-${stat.label}`}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
        <button className="btn-primary" onClick={onContinue}>
          Open dossier <ArrowRight size={18} />
        </button>
      </div>
    </motion.section>
  )
}
