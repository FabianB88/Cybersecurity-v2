import { motion } from 'framer-motion'
import { ShieldCheck, Terminal } from 'lucide-react'
import { useState } from 'react'

export default function StartScreen({ onStart }) {
  const [name, setName] = useState('')

  function submit(event) {
    event.preventDefault()
    onStart(name)
  }

  return (
    <motion.section className="screen start-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="brand-lockup">
        <div className="status-pill"><Terminal size={14} /> Incident briefing</div>
        <h1>CyberDetective</h1>
        <p>Text-Based Adventure+</p>
      </div>
      <form className="start-panel" onSubmit={submit}>
        <label htmlFor="playerName">Naam analist</label>
        <input
          id="playerName"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Bijv. Fabian"
          autoComplete="off"
        />
        <button className="btn-primary" type="submit">
          <ShieldCheck size={18} /> Start briefing
        </button>
      </form>
    </motion.section>
  )
}
