import { motion } from 'framer-motion'
import { ArrowRight, Activity, Banknote, Building2, FileCheck2, FileWarning, Network, Radio, TimerReset } from 'lucide-react'
import LiveRiskPanel from './LiveRiskPanel.jsx'
import { calculateLiveProgress, getRiskLevel, getScenarioRecap } from '../engine/progressEngine.js'

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
  collapse: {
    label: 'Crisisuitkomst',
    text: 'De opeenstapeling van keuzes is niet meer alleen schadebeperking. De organisatie verliest grip en moet overschakelen naar noodbestuur.',
  },
}

const meterLabels = {
  operation: { label: 'Operatie', icon: Activity },
  reputation: { label: 'Reputatie', icon: Building2 },
  financial: { label: 'Financieel', icon: Banknote },
  legal: { label: 'Juridisch', icon: FileWarning },
  chain: { label: 'Keten', icon: Network },
  pressure: { label: 'Druk', icon: TimerReset },
}

export default function ConsequenceScreen({ outcome, state, onContinue }) {
  const { choice } = outcome
  const quality = outcome.collapsed ? qualityCopy.collapse : qualityCopy[choice.quality] || qualityCopy.acceptable
  const values = calculateLiveProgress(state.nodeHistory)
  const level = getRiskLevel(values)

  return (
    <motion.section
      className={`screen consequence-screen ${outcome.isScenarioEnd || outcome.collapsed ? 'scenario-finished' : ''}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
    >
      <div className="consequence-layout">
      <LiveRiskPanel state={state} />
      <article className={`consequence-card ${outcome.isScenarioEnd || outcome.collapsed ? 'scenario-finished-card' : ''}`}>
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

        <div className={`analysis-box ${outcome.collapsed ? 'collapse' : choice.quality}`}>
          <span>{quality.label}</span>
          <p>{quality.text}</p>
        </div>

        <div className="next-briefing">
          <span>Nieuwe situatie</span>
          {outcome.collapsed ? (
            <>
              <strong>{outcome.collapseTitle}</strong>
              <p>{outcome.collapseText}</p>
            </>
          ) : outcome.isScenarioEnd ? (
            <p>Dit incident is afgerond. Je neemt de les mee naar het volgende dossier.</p>
          ) : (
            <>
              <strong>{outcome.nextNodeTitle}</strong>
              <p>{outcome.nextSituation}</p>
            </>
          )}
        </div>

        {(outcome.isScenarioEnd || outcome.collapsed) && (
          <DossierDebrief outcome={outcome} state={state} values={values} level={level} />
        )}

        <button className="btn-primary align-right" onClick={onContinue}>
          Verder <ArrowRight size={18} />
        </button>
      </article>
      </div>
    </motion.section>
  )
}

function DossierDebrief({ outcome, state, values, level }) {
  const recap = getScenarioRecap(state, outcome.scenarioTitle)
  const theory = outcome.scenarioReflection || {}

  return (
    <div className={`dossier-debrief ${outcome.collapsed ? 'collapse' : level.className}`}>
      <div className="debrief-hero">
        <span><FileCheck2 size={16} /> Eindrapport scenario</span>
        <h3>{outcome.collapsed ? outcome.collapseTitle : `Dossier ${outcome.scenarioTitle} afgerond`}</h3>
        <p>{outcome.collapsed ? outcome.collapseText : theory.summary || 'Je keuzes hebben het incident richting gegeven. Sommige keuzes beperkten verspreiding; andere vergrootten druk, schade of onzekerheid.'}</p>
      </div>

      <div className="debrief-grid">
        <div className="debrief-tile primary">
          <strong>Risiconiveau</strong>
          <p>{level.label}: {level.text}</p>
        </div>
        <div className="debrief-tile">
          <strong>CIA-koppeling</strong>
          <p>{theory.cia || `Dit dossier raakt vooral ${outcome.scenarioCia?.join(' en ')}.`}</p>
        </div>
        <div className="debrief-tile">
          <strong>TBK-bril</strong>
          <p>{theory.tbk || `Kijk naar ${outcome.scenarioLens}: welk proces, welke afhankelijkheid en welke maatregel zijn bedrijfskundig relevant?`}</p>
        </div>
      </div>

      <div className="debrief-grid">
        <div className="debrief-tile">
          <strong>Waar zit de pijn?</strong>
          <p>Operatie {values.operation}, keten {values.chain}, reputatie {values.reputation}, juridisch {values.legal}, financieel {values.financial}.</p>
        </div>
        <div className="debrief-tile">
          <strong>Waar zit veerkracht?</strong>
          <p>Herstelvermogen {values.recovery}, vertrouwen {values.trust}. Een hoog herstelvermogen kan tijdelijke schade acceptabel maken.</p>
        </div>
      </div>

      <div className="path-recap">
        <span>Pad dat je hebt ingeslagen</span>
        {recap.map((item, index) => (
          <div className="path-step" key={`${item.node}-${index}`}>
            <strong>{item.node}: {item.label}</strong>
            <p>{item.consequence}</p>
          </div>
        ))}
      </div>

      <div className="reflection-box">
        <strong>Reflectie voor je praktijkcasus</strong>
        <ul>
          {(theory.questions || [
            'Welk bedrijfsproces zou bij jullie als eerste stilvallen?',
            'Welke maatregel verlaagt vooral kans, en welke verlaagt vooral impact?',
            'Wie mag onder tijdsdruk beslissen om systemen stil te leggen?',
          ]).map((question) => <li key={question}>{question}</li>)}
        </ul>
      </div>
    </div>
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
