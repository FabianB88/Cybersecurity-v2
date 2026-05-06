import { Activity, Banknote, Building2, FileWarning, Handshake, Network, ShieldCheck, TimerReset } from 'lucide-react'
import { calculateLiveProgress, getRiskLevel } from '../engine/progressEngine.js'

const exposureMeters = [
  { key: 'operation', label: 'Operatie', icon: Activity },
  { key: 'reputation', label: 'Reputatie', icon: Building2 },
  { key: 'financial', label: 'Financieel', icon: Banknote },
  { key: 'legal', label: 'Juridisch', icon: FileWarning },
  { key: 'chain', label: 'Keten', icon: Network },
  { key: 'pressure', label: 'Besluitdruk', icon: TimerReset },
]

const resilienceMeters = [
  { key: 'recovery', label: 'Herstelvermogen', icon: ShieldCheck },
  { key: 'trust', label: 'Vertrouwen', icon: Handshake },
]

export default function LiveRiskPanel({ state, compact = false }) {
  const values = calculateLiveProgress(state.nodeHistory)
  const level = getRiskLevel(values)
  const max = Math.max(8, ...exposureMeters.map((meter) => values[meter.key]))

  return (
    <aside className={`live-risk-panel ${compact ? 'compact' : ''}`}>
      <span className="risk-title">Live risicobeeld</span>
      <div className={`risk-level ${level.className}`}>
        <strong>{level.label}</strong>
        {!compact && <span>{level.text}</span>}
      </div>

      {exposureMeters.map((meter) => {
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

      <div className="positive-meter-group">
        {resilienceMeters.map((meter) => {
          const Icon = meter.icon
          const value = values[meter.key]
          return (
            <div className="positive-risk-row" key={meter.key}>
              <Icon size={15} />
              <span>{meter.label}</span>
              <strong>{value}</strong>
            </div>
          )
        })}
      </div>

      <p>Hoger risico is niet automatisch fout: soms accepteer je korte schade om ketenschade, juridische schade of herstelproblemen te beperken.</p>
    </aside>
  )
}
