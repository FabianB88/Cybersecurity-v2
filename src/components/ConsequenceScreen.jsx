import { motion } from 'framer-motion'
import { ArrowRight, Activity, Banknote, Building2, Radio } from 'lucide-react'
import LiveRiskPanel from './LiveRiskPanel.jsx'
import { getScenarioRecap } from '../engine/progressEngine.js'

const qualityCopy = {
  best: {
    label: 'Sterke crisiskeuze',
    text: 'Je keuze verlaagt het belangrijkste risico in deze situatie. Er is nog steeds schade, maar het incident blijft bestuurbaar.',
  },
  acceptable: {
    label: 'Verdedigbaar, met bijwerkingen',
    text: 'Deze keuze kan werken, maar veroorzaakt nieuwe onzekerheid. Je koopt tijd of beperkt schade, terwijl een ander risico blijft groeien.',
  },
  risky: {
    label: 'Risicovolle afslag',
    text: 'De keuze voelt begrijpelijk onder druk, maar vergroot de kans dat het incident escaleert of later moeilijker te herstellen is.',
  },
}

const meterLabels = {
  operation: { label: 'Operatie', icon: Activity },
  reputation: { label: 'Reputatie', icon: Building2 },
  financial: { label: 'Financieel', icon: Banknote },
}

export default function ConsequenceScreen({ outcome, state, onContinue }) {
  const { choice } = outcome
  const quality = qualityCopy[choice.quality] || qualityCopy.acceptable

  return (
    <motion.section
      className="screen consequence-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
    >
      <div className="consequence-layout">
      <LiveRiskPanel state={state} />
      <article className="consequence-card">
        <div className="node-eyebrow"><Radio size={15} /> Gevolg van je actie</div>
        <h2>{outcome.nodeTitle}</h2>
        <div className="chosen-action">
          <span>Je koos</span>
          <strong>{choice.label}</strong>
          <p>{choice.text}</p>
        </div>

        <div className="story-result">
          <h3>Wat er daarna gebeurt</h3>
          <p>{choice.consequence}</p>
          <p>{buildNarrative(outcome)}</p>
        </div>

        <div className="impact-deltas">
          {Object.entries(meterLabels).map(([key, item]) => {
            const Icon = item.icon
            const value = choice.meters?.[key] || 0
            return (
              <div className={`delta-tile level-${Math.min(value, 3)}`} key={key}>
                <Icon size={18} />
                <span>{item.label}</span>
                <strong>{value === 0 ? 'stabiel' : `+${value}`}</strong>
              </div>
            )
          })}
        </div>

        <div className={`analysis-box ${choice.quality}`}>
          <span>{quality.label}</span>
          <p>{quality.text}</p>
        </div>

        <div className="next-briefing">
          <span>Nieuwe situatie</span>
          {outcome.isScenarioEnd ? (
            <p>Dit incident is afgerond. Je neemt de les mee naar het volgende dossier.</p>
          ) : (
            <>
              <strong>{outcome.nextNodeTitle}</strong>
              <p>{outcome.nextSituation}</p>
            </>
          )}
        </div>

        {outcome.isScenarioEnd && (
          <div className="path-recap">
            <span>Pad dat je hebt ingeslagen</span>
            {getScenarioRecap(state, outcome.scenarioTitle).map((item, index) => (
              <div className="path-step" key={`${item.node}-${index}`}>
                <strong>{item.node}: {item.label}</strong>
                <p>{item.consequence}</p>
              </div>
            ))}
          </div>
        )}

        <button className="btn-primary align-right" onClick={onContinue}>
          Verder <ArrowRight size={18} />
        </button>
      </article>
      </div>
    </motion.section>
  )
}

function buildNarrative(outcome) {
  const { choice } = outcome
  if (choice.quality === 'best') {
    return 'In het crisisteam ontstaat rust: de beslissing is uitlegbaar, uitvoerbaar en gekoppeld aan het grootste bedrijfsrisico.'
  }
  if (choice.quality === 'risky') {
    return 'In de eerste minuten lijkt dit snelheid op te leveren. Daarna komen de neveneffecten: meer afstemming, meer onzekerheid en minder controle over het vervolg.'
  }
  return 'De organisatie kan door, maar het dossier blijft open. Je hebt een deel van het probleem opgelost en tegelijk een nieuw aandachtspunt gecreeerd.'
}
