import { useState } from 'react'
import { calculateLiveProgress, isScenarioCollapse } from './progressEngine.js'

const initialState = {
  screen: 'start',
  playerName: '',
  currentScenarioIndex: 0,
  currentNodeId: 'start',
  choices: {},
  nodeHistory: [],       // full history across all scenarios (for end report)
  scenarioHistory: [],   // history for CURRENT scenario only (resets between scenarios)
  consequenceLog: [],
  pendingOutcome: null,
}

export function useGameState(scenarios) {
  const [state, setState] = useState(initialState)

  function startGame(playerName) {
    setState((current) => ({
      ...current,
      screen: 'onboarding',
      playerName: playerName.trim() || 'Analist',
    }))
  }

  function finishOnboarding() {
    setState((current) => ({ ...current, screen: 'intro' }))
  }

  function finishIntro() {
    const firstNode = scenarios[state.currentScenarioIndex].nodes[0]
    setState((current) => ({ ...current, screen: 'node', currentNodeId: firstNode.id }))
  }

  function makeChoice(choiceId) {
    const scenario = scenarios[state.currentScenarioIndex]
    const node = scenario.nodes.find((item) => item.id === state.currentNodeId)
    const choice = node.choices.find((item) => item.id === choiceId)
    const nextNode =
      choice.next === 'end_scenario'
        ? null
        : scenario.nodes.find((item) => item.id === choice.next)
    const key = `${scenario.id}:${node.id}`

    const historyEntry = {
      scenarioId: scenario.id,
      nodeId: node.id,
      nodeTitle: node.title,
      choiceId,
      choiceLabel: choice.label,
      quality: choice.quality,
      risk: choice.risk,
      meters: choice.meters,
      tbkTags: node.tbkTags,
      // Fork support: set forkPoint: true on a node and forkLabel on a choice
      // to mark this as a meaningful branching moment in the report.
      isForkPoint: node.forkPoint === true,
      forkLabel: choice.forkLabel || null,
    }

    const nextChoices = { ...state.choices, [key]: choiceId }
    const nextHistory = [...state.nodeHistory, historyEntry]
    const nextScenarioHistory = [...state.scenarioHistory, historyEntry]
    const nextValues = calculateLiveProgress(nextScenarioHistory)
    const collapsed =
      choice.collapse === true ||
      (scenario.allowCollapse !== false && isScenarioCollapse(nextValues))
    const nextLog = [
      ...state.consequenceLog,
      {
        scenario: scenario.title,
        node: node.title,
        label: choice.label,
        consequence: choice.consequence,
        quality: choice.quality,
        collapsed,
      },
    ]

    setState((current) => ({
      ...current,
      screen: 'consequence',
      choices: nextChoices,
      nodeHistory: nextHistory,
      scenarioHistory: nextScenarioHistory,
      consequenceLog: nextLog,
      pendingOutcome: {
        scenarioId: scenario.id,
        scenarioTitle: scenario.title,
        scenarioCia: scenario.cia,
        scenarioLens: scenario.tbkLens,
        scenarioReflection: scenario.reflection,
        nodeId: node.id,
        nodeTitle: node.title,
        choice,
        nextNodeId: choice.next,
        nextNodeTitle: nextNode?.title || null,
        nextSituation: nextNode?.situation || null,
        isScenarioEnd: choice.next === 'end_scenario',
        collapsed,
        collapseTitle:
          choice.collapseTitle || scenario.collapse?.title || 'Het dossier escaleert',
        collapseText:
          choice.collapseText ||
          scenario.collapse?.text ||
          'De opeenstapeling van keuzes heeft het incident buiten beheersbare grenzen geduwd.',
      },
    }))
  }

  function continueAfterConsequence() {
    const outcome = state.pendingOutcome
    if (!outcome) return

    // Scenario finished (natural end or collapse) → go to per-scenario report
    if (outcome.nextNodeId === 'end_scenario' || outcome.collapsed) {
      setState((current) => ({
        ...current,
        screen: 'scenario_report',
        pendingOutcome: null,
      }))
      return
    }

    // Scenario still running — find the next node defensively
    const scenario = scenarios[state.currentScenarioIndex]
    const nextNode = scenario?.nodes.find((item) => item.id === outcome.nextNodeId)
    if (!nextNode) {
      // Defensive: node ID not found → treat as scenario end
      setState((current) => ({
        ...current,
        screen: 'scenario_report',
        pendingOutcome: null,
      }))
      return
    }

    setState((current) => ({
      ...current,
      screen: 'node',
      currentNodeId: outcome.nextNodeId,
      pendingOutcome: null,
    }))
  }

  function advanceFromScenarioReport() {
    if (state.currentScenarioIndex < scenarios.length - 1) {
      const nextIndex = state.currentScenarioIndex + 1
      setState((current) => ({
        ...current,
        screen: 'intro',
        currentScenarioIndex: nextIndex,
        currentNodeId: scenarios[nextIndex].nodes[0].id,
        scenarioHistory: [],   // reset per-scenario risk tracker
      }))
    } else {
      setState((current) => ({
        ...current,
        screen: 'end',
      }))
    }
  }

  function restart() {
    setState(initialState)
  }

  return { state, startGame, finishOnboarding, finishIntro, makeChoice, continueAfterConsequence, advanceFromScenarioReport, restart }
}
