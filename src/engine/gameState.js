import { useState } from 'react'
import { calculateLiveProgress, isScenarioCollapse } from './progressEngine.js'

const initialState = {
  screen: 'start',
  playerName: '',
  currentScenarioIndex: 0,
  currentNodeId: 'start',
  choices: {},
  nodeHistory: [],
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
    const nextNode = choice.next === 'end_scenario'
      ? null
      : scenario.nodes.find((item) => item.id === choice.next)
    const key = `${scenario.id}:${node.id}`
    const historyEntry = {
      scenarioId: scenario.id,
      nodeId: node.id,
      choiceId,
      choiceLabel: choice.label,
      quality: choice.quality,
      risk: choice.risk,
      meters: choice.meters,
      tbkTags: node.tbkTags,
    }

    const nextChoices = { ...state.choices, [key]: choiceId }
    const nextHistory = [...state.nodeHistory, historyEntry]
    const nextValues = calculateLiveProgress(nextHistory)
    const collapsed = choice.collapse === true || (scenario.allowCollapse !== false && isScenarioCollapse(nextValues))
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
        collapseTitle: choice.collapseTitle || scenario.collapse?.title || 'Het dossier escaleert',
        collapseText: choice.collapseText || scenario.collapse?.text || 'De opeenstapeling van keuzes heeft het incident buiten beheersbare grenzen geduwd.',
      },
    }))
  }

  function continueAfterConsequence() {
    const outcome = state.pendingOutcome
    if (!outcome) return

    if (outcome.nextNodeId === 'end_scenario' || outcome.collapsed) {
      if (state.currentScenarioIndex < scenarios.length - 1) {
        setState((current) => ({
          ...current,
          screen: 'intro',
          currentScenarioIndex: current.currentScenarioIndex + 1,
          currentNodeId: scenarios[current.currentScenarioIndex + 1].nodes[0].id,
          pendingOutcome: null,
        }))
        return
      }

      setState((current) => ({
        ...current,
        screen: 'end',
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

  function restart() {
    setState(initialState)
  }

  return { state, startGame, finishOnboarding, finishIntro, makeChoice, continueAfterConsequence, restart }
}
