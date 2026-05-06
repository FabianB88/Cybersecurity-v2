import { motion } from 'framer-motion'
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  GitFork,
  RotateCcw,
  Printer,
  ClipboardList,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react'
import { calculateRiskProfile } from '../engine/riskEngine.js'
import { buildScenarioReports, getOverallVerdict } from '../engine/progressEngine.js'
import { groupAssignment } from '../content/outcomes.js'
import RiskMeters from './RiskMeters.jsx'
import VulnerabilityBars from './VulnerabilityBars.jsx'

const QUALITY = {
  best:       { icon: CheckCircle2,  label: 'Proactief',  cls: 'best' },
  acceptable: { icon: AlertTriangle, label: 'Adequaat',   cls: 'acceptable' },
  risky:      { icon: XCircle,       label: 'Risicovol',  cls: 'risky' },
}

function QualityBadge({ quality }) {
  const q = QUALITY[quality] || QUALITY.acceptable
  const Icon = q.icon
  return (
    <span className={`quality-badge quality-${q.cls}`}>
      <Icon size={12} /> {q.label}
    </span>
  )
}

function ScenarioReport({ report }) {
  const scoreClass = report.score >= 75 ? 'good' : report.score >= 45 ? 'mid' : 'low'
  return (
    <section className="end-panel scenario-report">
      <div className="scenario-report-header">
        <div>
          <h3>{report.title}</h3>
          <span className="scenario-meta-text">{report.sector}{report.year ? ` · ${report.year}` : ''}</span>
        </div>
        <div className="scenario-report-badges">
          <span className={`score-badge score-${scoreClass}`}>{report.score}%</span>
          {report.collapsed && (
            <span className="quality-badge quality-risky"><ShieldAlert size={12} /> Escalatie</span>
          )}
        </div>
      </div>

      <div className="decision-timeline">
        {report.entries.map((entry, i) => {
          const q = QUALITY[entry.quality] || QUALITY.acceptable
          const Icon = q.icon
          return (
            <div key={`${entry.nodeId}-${i}`} className="timeline-entry">
              {entry.isForkPoint && (
                <div className="fork-indicator">
                  <GitFork size={13} />
                  <span>Fork — gekozen pad: <strong>{entry.forkLabel || entry.choiceLabel}</strong></span>
                </div>
              )}
              <div className="timeline-node">
                <span className="timeline-step">{i + 1}</span>
                <div className="timeline-content">
                  <span className="timeline-node-title">{entry.nodeTitle || entry.nodeId}</span>
                  <div className="timeline-choice">
                    <Icon size={13} className={`quality-icon-inline ${q.cls}`} />
                    <span className="timeline-choice-label">{entry.choiceLabel}</span>
                    <QualityBadge quality={entry.quality} />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="scenario-counts">
        <span className="qcount best"><CheckCircle2 size={13} /> {report.counts.best} proactief</span>
        <span className="qcount acceptable"><AlertTriangle size={13} /> {report.counts.acceptable} adequaat</span>
        <span className="qcount risky"><XCircle size={13} /> {report.counts.risky} risicovol</span>
      </div>
    </section>
  )
}

export default function EndScreen({ state, scenarios, onRestart }) {
  const result = calculateRiskProfile(state.nodeHistory)
  const verdict = getOverallVerdict(state.nodeHistory)
  const scenarioReports = buildScenarioReports(state, scenarios)
  const verdictClass = verdict.verdict.toLowerCase()

  return (
    <motion.section
      className="screen end-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      {/* ── Hero ── */}
      <div className="section-heading">
        <span>Eindrapport</span>
        <h2>{state.playerName}</h2>
        <p>{verdict.label}</p>
      </div>

      {/* ── Overall score ── */}
      <section className="end-panel verdict-panel">
        <div className="verdict-score-block">
          <Award size={36} className="verdict-award" />
          <div>
            <span className="verdict-number">{verdict.score}%</span>
            <span className={`verdict-label verdict-${verdictClass}`}>{verdict.verdict}</span>
          </div>
        </div>
        <div className="verdict-breakdown">
          <span className="qcount best"><CheckCircle2 size={14} /> {verdict.counts.best} proactief</span>
          <span className="qcount acceptable"><AlertTriangle size={14} /> {verdict.counts.acceptable} adequaat</span>
          <span className="qcount risky"><XCircle size={14} /> {verdict.counts.risky} risicovol</span>
        </div>
        <p className="verdict-sub">
          <TrendingUp size={14} /> {verdict.counts.best} van de {state.nodeHistory.length} keuzes waren de beste optie.
        </p>
      </section>

      {/* ── Per scenario ── */}
      <div className="section-heading section-heading-sm">
        <span>Beslissingspad</span>
        <h3>Hoe liep jouw route?</h3>
      </div>
      {scenarioReports.map((report) => (
        <ScenarioReport key={report.id} report={report} />
      ))}

      {/* ── Risk profile ── */}
      <div className="section-heading section-heading-sm">
        <span>Risicoprofiel</span>
        <h3>Waar ligt jouw kwetsbaarheid?</h3>
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

      {/* ── Patterns ── */}
      <section className="end-panel">
        <h3>Beslissingspatroon</h3>
        <p>{result.blindSpotMessage}</p>
        <div className="tag-list spaced">
          {result.topTags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      {/* ── Research questions ── */}
      <section className="end-panel">
        <h3>Onderzoeksvragen voor je praktijkcasus</h3>
        <p className="section-intro">
          Gebaseerd op jouw keuzepatroon en dominant risico ({result.dominantCategory}).
          Gebruik deze vragen als startpunt voor je eigen bedrijfsanalyse.
        </p>
        <ol className="question-list">
          {result.researchQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </section>

      {/* ── Group assignment ── */}
      <section className="end-panel">
        <h3><ClipboardList size={18} /> {groupAssignment.title}</h3>
        <ol className="question-list">
          {groupAssignment.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="formula">{groupAssignment.formula}</p>
      </section>

      {/* ── Actions ── */}
      <div className="end-actions">
        <button className="btn-secondary" onClick={() => window.print()}>
          <Printer size={17} /> Rapport afdrukken
        </button>
        <button className="btn-secondary align-right" onClick={onRestart}>
          <RotateCcw size={17} /> Opnieuw spelen
        </button>
      </div>
    </motion.section>
  )
}
