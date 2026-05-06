import { motion } from 'framer-motion'
import { ClipboardList, RotateCcw } from 'lucide-react'
import { calculateRiskProfile } from '../engine/riskEngine.js'
import { groupAssignment } from '../content/outcomes.js'
import IncidentCard from './IncidentCard.jsx'
import RiskMeters from './RiskMeters.jsx'
import VulnerabilityBars from './VulnerabilityBars.jsx'

export default function EndScreen({ state, onRestart }) {
  const result = calculateRiskProfile(state.nodeHistory)

  return (
    <motion.section className="screen end-screen" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="section-heading">
        <span>Onderzoeksbriefing</span>
        <h2>{state.playerName}, als jouw keuzes een bedrijf waren...</h2>
        <p>Dit is geen cijfer. Het is een richting voor je praktijkcasus.</p>
      </div>

      <div className="end-grid">
        <section className="end-panel">
          <h3>Kwetsbaarheidsmix</h3>
          <VulnerabilityBars profile={result.profile} />
        </section>
        <section className="end-panel">
          <h3>Schadeprofiel</h3>
          <RiskMeters meterTotals={result.meterTotals} />
        </section>
      </div>

      <section className="end-panel">
        <h3>Mogelijke incidenten</h3>
        <div className="incident-grid">
          {result.incidents.map((incident) => <IncidentCard key={incident.title} incident={incident} />)}
        </div>
      </section>

      <section className="end-panel">
        <h3>Wat dit zegt over je blik</h3>
        <p>{result.blindSpotMessage}</p>
        <div className="tag-list spaced">
          {result.topTags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
      </section>

      <section className="end-panel">
        <h3>Onderzoeksvragen voor je praktijkcasus</h3>
        <ol className="question-list">
          {result.researchQuestions.map((question) => <li key={question}>{question}</li>)}
        </ol>
      </section>

      <section className="end-panel">
        <h3><ClipboardList size={18} /> {groupAssignment.title}</h3>
        <ol className="question-list">
          {groupAssignment.steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
        <p className="formula">{groupAssignment.formula}</p>
      </section>

      <section className="end-panel">
        <h3>Consequence log</h3>
        <div className="log-list">
          {state.consequenceLog.slice(-10).map((item, index) => (
            <div className="log-item" key={`${item.scenario}-${item.node}-${index}`}>
              <span>{item.scenario}</span>
              <strong>{item.label}</strong>
              <p>{item.consequence}</p>
            </div>
          ))}
        </div>
      </section>

      <button className="btn-secondary align-right" onClick={onRestart}>
        <RotateCcw size={17} /> Opnieuw spelen
      </button>
    </motion.section>
  )
}
