import { casusTips, incidentLibrary, blindSpotMessages } from '../content/outcomes.js'

const categories = ['mens', 'proces', 'tech']
const meterKeys = ['financial', 'reputation', 'operation', 'legal', 'chain', 'pressure']

export function calculateRiskProfile(nodeHistory) {
  const riskTotals = { mens: 0, proces: 0, tech: 0 }
  const meterTotals = { financial: 0, reputation: 0, operation: 0 }
  const qualityTotals = { best: 0, acceptable: 0, risky: 0 }
  const tagTotals = {}

  nodeHistory.forEach((entry) => {
    const multiplier = entry.quality === 'risky' ? 2 : entry.quality === 'acceptable' ? 1 : 0
    categories.forEach((category) => {
      riskTotals[category] += (entry.risk?.[category] || 0) * multiplier
    })
    meterKeys.forEach((key) => {
      meterTotals[key] += entry.meters?.[key] || 0
    })
    qualityTotals[entry.quality] += 1
    entry.tbkTags?.forEach((tag) => {
      tagTotals[tag] = (tagTotals[tag] || 0) + multiplier
    })
  })

  const maxRisk = Math.max(1, ...Object.values(riskTotals))
  const profile = Object.fromEntries(
    categories.map((category) => [category, Math.round((riskTotals[category] / maxRisk) * 100)]),
  )

  const dominantCategory = Object.entries(profile).sort((a, b) => b[1] - a[1])[0][0]
  const secondCategory = Object.entries(profile).sort((a, b) => b[1] - a[1])[1][0]
  const blindSpot = getBlindSpot(qualityTotals, dominantCategory)
  const topTags = Object.entries(tagTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([tag]) => tag)

  return {
    profile,
    meterTotals,
    qualityTotals,
    dominantCategory,
    secondCategory,
    blindSpot,
    blindSpotMessage: blindSpotMessages[blindSpot],
    topTags,
    incidents: selectIncidents(dominantCategory, secondCategory),
    researchQuestions: selectResearchQuestions(dominantCategory, secondCategory),
  }
}

function getBlindSpot(qualityTotals, dominantCategory) {
  if (qualityTotals.risky >= 5) return 'late_action'
  if (dominantCategory === 'proces') return 'no_protocol'
  if (dominantCategory === 'tech') return 'trust_tech'
  if (dominantCategory === 'mens') return 'human_pressure'
  return 'general'
}

function selectIncidents(primary, secondary) {
  return [...incidentLibrary[primary].slice(0, 2), incidentLibrary[secondary][0]]
}

function selectResearchQuestions(primary, secondary) {
  return [...casusTips[primary].questions.slice(0, 2), casusTips[secondary].questions[0]].slice(0, 3)
}
