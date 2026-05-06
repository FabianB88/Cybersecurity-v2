import { motion } from 'framer-motion'
import { ArrowRight, Database, Network, Users } from 'lucide-react'

const blocks = [
  {
    icon: Database,
    title: 'CIA-model',
    text: 'Confidentiality, Integrity en Availability. Je kijkt steeds welk organisatierisico geraakt wordt.',
  },
  {
    icon: Users,
    title: 'Mens / Proces / Tech',
    text: 'Fouten zijn zelden alleen technisch. Je zoekt naar de structurele oorzaak achter het incident.',
  },
  {
    icon: Network,
    title: 'Risico = kans x impact',
    text: 'Je keuzes gaan over prioriteren onder onzekerheid: wat verlaagt kans, impact of hersteltijd?',
  },
]

export default function OnboardingScreen({ onContinue }) {
  return (
    <motion.section className="screen content-screen" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <div className="section-heading">
        <span>Voor je begint</span>
        <h2>Je speelt als bedrijfskundig incident-analist.</h2>
      </div>
      <div className="briefing-grid">
        {blocks.map((block) => {
          const Icon = block.icon
          return (
            <article className="briefing-card" key={block.title}>
              <Icon size={22} />
              <h3>{block.title}</h3>
              <p>{block.text}</p>
            </article>
          )
        })}
      </div>
      <button className="btn-primary align-right" onClick={onContinue}>
        Start scenario 1 <ArrowRight size={18} />
      </button>
    </motion.section>
  )
}
