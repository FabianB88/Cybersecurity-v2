import { motion } from 'framer-motion'
import {
  ArrowRight,
  Activity,
  Banknote,
  Building2,
  FileCheck2,
  FileWarning,
  Handshake,
  Network,
  ShieldCheck,
  TimerReset,
} from 'lucide-react'
import { calculateLiveProgress, getRiskLevel, getScenarioRecap } from '../engine/progressEngine.js'

const meterRows = [
  { key: 'operation', label: 'Operatie', icon: Activity, type: 'exposure' },
  { key: 'reputation', label: 'Reputatie', icon: Building2, type: 'exposure' },
  { key: 'financial', label: 'Financieel', icon: Banknote, type: 'exposure' },
  { key: 'legal', label: 'Juridisch', icon: FileWarning, type: 'exposure' },
  { key: 'chain', label: 'Keten', icon: Network, type: 'exposure' },
  { key: 'pressure', label: 'Besluitdruk', icon: TimerReset, type: 'exposure' },
  { key: 'recovery', label: 'Herstelvermogen', icon: ShieldCheck, type: 'resilience' },
  { key: 'trust', label: 'Vertrouwen', icon: Handshake, type: 'resilience' },
]

export default function ScenarioReportScreen({ scenario, state, onAdvance, isLastScenario }) {
  // Only use current scenario's history for the risk meters
  const values = calculateLiveProgress(state.scenarioHistory ?? [])
  const level = getRiskLevel(values)
  const recap = getScenarioRecap(state, scenario.title)
  const theory = scenario.reflection || {}

  const collapsed = recap.some((item) => item.collapsed)
  const counts = recap.reduce(
    (acc, item) => {
      acc[item.quality] = (acc[item.quality] || 0) + 1
      return acc
    },
    { best: 0, acceptable: 0, risky: 0 },
  )
  const score =
    recap.length > 0
      ? Math.round(((counts.best * 2 + counts.acceptable * 1) / (recap.length * 2)) * 100)
      : 0

  const verdictLabel =
    score >= 75 ? 'Proactief' : score >= 45 ? 'Reactief' : 'Escalerend'
  const verdictText =
    score >= 75
      ? 'Je koos structureel voor preventie en escalatiebeheersing.'
      : score >= 45
        ? 'Je reageerde adequaat, maar miste proactieve controlemomenten.'
        : 'Je keuzes leidden herhaaldelijk tot escalatie en controleverlies.'

  const maxExposure = Math.max(
    8,
    ...meterRows.filter((m) => m.type === 'exposure').map((m) => values[m.key]),
  )

  return (
    <motion.section
      className="screen scenario-report-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
    >
      <article className={`scenario-report-card ${collapsed ? 'collapse' : level.className}`}>

        {/* Header */}
        <div className="report-header">
          <div className="report-eyebrow">
            <FileCheck2 size={16} />
            <span>Scenario afgesloten</span>
          </div>
          <h2>
            {collapsed ? scenario.collapse?.title || 'Het dossier escaleert' : `Dossier ${scenario.title} afgerond`}
          </h2>
          <p className="report-summary">
            {collapsed
              ? scenario.collapse?.text ||
                'De opeenstapeling van keuzes heeft het incident buiten beheersbare grenzen geduwd.'
              : theory.summary ||
                'Je keuzes hebben het incident richting gegeven. Sommige keuzes beperkten verspreiding; andere vergrootten druk, schade of onzekerheid.'}
          </p>
        </div>

        {/* Score banner */}
        <div className={`verdict-banner ${collapsed ? 'collapse' : level.className}`}>
          <div className="verdict-score">{score}%</div>
          <div>
            <strong>{verdictLabel}</strong>
            <p>{verdictText}</p>
          </div>
          <div className="quality-counts">
            <span className="count-best">✓ {counts.best} sterk</span>
            <span className="count-acceptable">~ {counts.acceptable} verdedigbaar</span>
            <span className="count-risky">✗ {counts.risky} risicovol</span>
          </div>
        </div>

        {/* Risk meters */}
        <div className="report-meters">
          <h3>Risicobalans dit scenario</h3>
          <div className="report-meter-grid">
            {meterRows.map((meter) => {
              const Icon = meter.icon
              const value = values[meter.key]
              const isResilience = meter.type === 'resilience'
              return (
                <div className={`report-meter-row ${isResilience ? 'resilience' : 'exposure'}`} key={meter.key}>
                  <Icon size={14} />
                  <span>{meter.label}</span>
                  {!isResilience && (
                    <div className="report-meter-track">
                      <div
                        className="report-meter-fill"
                        style={{ width: `${Math.min(100, (value / maxExposure) * 100)}%` }}
                      />
                    </div>
                  )}
                  <strong>{value}</strong>
                </div>
              )
            })}
          </div>
          <div className="report-risk-level">
            <span className={`risk-badge ${level.className}`}>{level.label}</span>
            <span>{level.text}</span>
          </div>
        </div>

        {/* Context analysis */}
        <div className="report-analysis-grid">
          <div className="report-tile">
            <strong>CIA-koppeling</strong>
            <p>{theory.cia || `Dit dossier raakt vooral ${scenario.cia?.join(' en ')}.`}</p>
          </div>
          <div className="report-tile">
            <strong>TBK-bril</strong>
            <p>
              {theory.tbk ||
                `Kijk naar ${scenario.tbkLens}: welk proces, welke afhankelijkheid en welke maatregel zijn bedrijfskundig relevant?`}
            </p>
          </div>
        </div>

        {/* Path recap */}
        <div className="path-recap">
          <span>Pad dat je hebt ingeslagen</span>
          {recap.map((item, index) => (
            <div
              className={`path-step quality-${item.quality}${item.collapsed ? ' collapsed' : ''}`}
              key={`${item.node}-${index}`}
            >
              <strong>
                {item.node}: {item.label}
              </strong>
              <p>{item.consequence}</p>
            </div>
          ))}
        </div>

        {/* Reflection */}
        <div className="reflection-box">
          <strong>Reflectie voor je praktijkcasus</strong>
          <ul>
            {(
              theory.questions || [
                'Welk bedrijfsproces zou bij jullie als eerste stilvallen?',
                'Welke maatregel verlaagt vooral kans, en welke verlaagt vooral impact?',
                'Wie mag onder tijdsdruk beslissen om systemen stil te leggen?',
              ]
            ).map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </div>

        <button className="btn-primary align-right" onClick={onAdvance}>
          {isLastScenario ? 'Bekijk eindrapport' : 'Volgende casus'} <ArrowRight size={18} />
        </button>
      </article>
    </motion.section>
  )
}
