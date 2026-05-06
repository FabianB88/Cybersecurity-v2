import { motion } from 'framer-motion'
import { ArrowRight, FileWarning, Tags } from 'lucide-react'
import { useState } from 'react'
import ChoiceButton from './ChoiceButton.jsx'
import DossierCard from './DossierCard.jsx'
import LiveRiskPanel from './LiveRiskPanel.jsx'
import ProgressBar from './ProgressBar.jsx'

export default function NodeScreen({ scenario, node, state, onChoice }) {
  const [selected, setSelected] = useState(null)

  return (
    <motion.section className="screen node-screen" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }}>
      <ProgressBar scenario={scenario} node={node} state={state} />
      <div className="node-layout">
        <article className="node-main">
          <div className="node-eyebrow"><FileWarning size={15} /> Incident decision</div>
          <h2>{node.title}</h2>
          <p className="situation">{node.situation}</p>
          <h3>{node.question}</h3>
          <div className="choice-list">
            {node.choices.map((choice) => (
              <ChoiceButton
                key={choice.id}
                choice={choice}
                selected={selected === choice.id}
                disabled={false}
                onSelect={setSelected}
              />
            ))}
          </div>
          <button className="btn-primary full-width" disabled={!selected} onClick={() => onChoice(selected)}>
            Voer actie uit <ArrowRight size={18} />
          </button>
        </article>
        <aside className="node-side">
          <LiveRiskPanel state={state} compact />
          <div className="side-section">
            <span className="side-title"><Tags size={14} /> TBK-bril</span>
            <div className="tag-list">
              {node.tbkTags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
            </div>
          </div>
          <div className="side-section">
            <span className="side-title">Dossierstukken</span>
            <div className="dossier-list">
              {getDossierItems(scenario, node).map((item) => <DossierCard item={item} key={item.title} />)}
            </div>
          </div>
          <div className="side-section">
            <span className="side-title">Incidentregel</span>
            <p>Je krijgt geen directe goed/fout-feedback. Elke actie veroorzaakt een nieuwe situatie, met gevolgen voor operatie, reputatie en financien.</p>
          </div>
        </aside>
      </div>
    </motion.section>
  )
}

function getDossierItems(scenario, node) {
  return [
    {
      title: 'Kernproces',
      text: `Bekijk dit als ${scenario.tbkLens.toLowerCase()}: welk proces valt stil, wie merkt dit als eerste, en welke klant- of ketenafspraak komt onder druk?`,
    },
    {
      title: 'CIA-signaal',
      text: `Let op ${scenario.cia.join(' en ')}. Vraag jezelf af: gaat het om geheimhouding, betrouwbaarheid van data of beschikbaarheid van systemen?`,
    },
    {
      title: 'Node-notitie',
      text: `Deze beslissing raakt vooral: ${node.tbkTags.join(', ')}. Je kunt dus beter kiezen op bedrijfskundige impact dan op technisch instinct alleen.`,
    },
  ]
}
