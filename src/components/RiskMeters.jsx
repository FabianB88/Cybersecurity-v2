const labels = {
  financial: 'Financieel',
  reputation: 'Reputatie',
  operation: 'Operatie',
}

export default function RiskMeters({ meterTotals }) {
  const max = Math.max(1, ...Object.values(meterTotals))
  return (
    <div className="risk-meter-grid">
      {Object.entries(labels).map(([key, label]) => (
        <div className="risk-meter" key={key}>
          <span>{label}</span>
          <div className="meter-track">
            <div className="meter-fill" style={{ width: `${(meterTotals[key] / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}
