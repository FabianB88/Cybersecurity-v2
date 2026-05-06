import { Activity, Banknote, Building2 } from 'lucide-react'
import { calculateLiveProgress } from '../engine/progressEngine.js'

const meters = [
  { key: 'operation', label: 'Operatie', icon: Activity },
  { key: 'reputation', label: 'Reputatie', icon: Building2 },
  { key: 'financial', label: 'Financieel', icon: Banknote },
]

export default function LiveRiskPanel({ state, compact = false }) {
  const values = calculateLiveProgress(state.nodeHistory)
  const max = Math.max(6, ...Object.values(values))

  return (
    <aside className={`live-risk-panel ${compact ? 'compact' : ''}`}>
      <span className="risk-title">Live risicobeeld</span>
      {meters.map((meter) => {
        const Icon = meter.icon
        const value = values[meter.key]
        return (
          <div className="live-risk-row" key={meter.key}>
            <Icon size={15} />
            <span>{meter.label}</span>
            <div className="live-risk-track">
              <div className="live-risk-fill" style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
            </div>
            <strong>{value}</strong>
          </div>
        )
      })}
      <p>Hoger risico is niet altijd “fout”: soms accepteer je schade om grotere ketenschade te voorkomen.</p>
    </aside>
  )
}
