export function calculateLiveProgress(nodeHistory) {
  const initial = {
    operation: 0,
    reputation: 0,
    financial: 0,
    legal: 0,
    chain: 0,
    trust: 0,
    recovery: 4,
    pressure: 0,
  }

  return nodeHistory.reduce(
    (totals, entry) => {
      const meters = entry.meters || {}
      return {
        operation: Math.max(0, totals.operation + (meters.operation || 0)),
        reputation: Math.max(0, totals.reputation + (meters.reputation || 0)),
        financial: Math.max(0, totals.financial + (meters.financial || 0)),
        legal: Math.max(0, totals.legal + (meters.legal || 0)),
        chain: Math.max(0, totals.chain + (meters.chain || 0)),
        trust: clamp(totals.trust + (meters.trust || 0), -6, 6),
        recovery: clamp(totals.recovery + (meters.recovery || 0), 0, 10),
        pressure: clamp(totals.pressure + (meters.pressure || 0), 0, 10),
      }
    },
    initial,
  )
}

export function getScenarioRecap(state, scenarioTitle) {
  return state.consequenceLog.filter((item) => item.scenario === scenarioTitle)
}

export function getRiskLevel(values) {
  const exposure = values.operation + values.reputation + values.financial + values.legal + values.chain
  const resilience = values.recovery + Math.max(0, values.trust)
  const score = Math.max(0, exposure + values.pressure - resilience)

  if (score >= 15) return { label: 'Escalatie', className: 'critical', text: 'Het incident loopt bestuurlijk en operationeel uit de hand.' }
  if (score >= 9) return { label: 'Kritiek', className: 'high', text: 'De organisatie kan nog sturen, maar elke keuze heeft zichtbare bijwerkingen.' }
  if (score >= 4) return { label: 'Verhoogd', className: 'medium', text: 'Er is schade of onzekerheid, maar het incident is nog beheersbaar.' }
  return { label: 'Beheerst', className: 'low', text: 'De situatie is gespannen, maar je houdt grip op vervolgschade.' }
}

export function isScenarioCollapse(values) {
  const level = getRiskLevel(values)
  return level.className === 'critical' || values.operation >= 12 || values.chain >= 10 || values.recovery <= 1
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}
