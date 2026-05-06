import { motion } from 'framer-motion'
import { ArrowRight, FileWarning, Tags } from 'lucide-react'
import { useState } from 'react'
import ChoiceButton from './ChoiceButton.jsx'
import ProgressBar from './ProgressBar.jsx'

export default function NodeScreen({ scenario, node, state, onChoice }) {
  const [selected, setSelected] = useState(null)
  const selectedChoice = node.choices.find((choice) => choice.id === selected)

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
            Bevestig keuze <ArrowRight size={18} />
          </button>
        </article>
        <aside className="node-side">
          <div className="side-section">
            <span className="side-title"><Tags size={14} /> TBK-bril</span>
            <div className="tag-list">
              {node.tbkTags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
            </div>
          </div>
          <div className="side-section">
            <span className="side-title">Keuze-effect</span>
            {selectedChoice ? (
              <p>{selectedChoice.consequence}</p>
            ) : (
              <p>Selecteer een optie om het verwachte effect te zien. Dit is nog geen feedback op goed of fout.</p>
            )}
          </div>
        </aside>
      </div>
    </motion.section>
  )
}
