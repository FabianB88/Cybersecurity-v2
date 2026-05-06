import { useState } from 'react'

const initialState = {
  screen: 'start',
  playerName: '',
  currentScenarioIndex: 0,
  currentNodeId: 'start',
  choices: {},
  nodeHistory: [],
  consequenceLog: [],
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
    const nextLog = [
      ...state.consequenceLog,
      {
        scenario: scenario.title,
        node: node.title,
        label: choice.label,
        consequence: choice.consequence,
        quality: choice.quality,
      },
    ]

    if (choice.next === 'end_scenario') {
      if (state.currentScenarioIndex < scenarios.length - 1) {
        setState((current) => ({
          ...current,
          screen: 'intro',
          currentScenarioIndex: current.currentScenarioIndex + 1,
          currentNodeId: scenarios[current.currentScenarioIndex + 1].nodes[0].id,
          choices: nextChoices,
          nodeHistory: nextHistory,
          consequenceLog: nextLog,
        }))
        return
      }

      setState((current) => ({
        ...current,
        screen: 'end',
        choices: nextChoices,
        nodeHistory: nextHistory,
        consequenceLog: nextLog,
      }))
      return
    }

    setState((current) => ({
      ...current,
      screen: 'node',
      currentNodeId: choice.next,
      choices: nextChoices,
      nodeHistory: nextHistory,
      consequenceLog: nextLog,
    }))
  }

  function restart() {
    setState(initialState)
  }

  return { state, startGame, finishOnboarding, finishIntro, makeChoice, restart }
}
