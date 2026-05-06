export function calculateLiveProgress(nodeHistory) {
  return nodeHistory.reduce(
    (totals, entry) => ({
      operation: totals.operation + (entry.meters?.operation || 0),
      reputation: totals.reputation + (entry.meters?.reputation || 0),
      financial: totals.financial + (entry.meters?.financial || 0),
    }),
    { operation: 0, reputation: 0, financial: 0 },
  )
}

export function getScenarioRecap(state, scenarioTitle) {
  return state.consequenceLog.filter((item) => item.scenario === scenarioTitle)
}
