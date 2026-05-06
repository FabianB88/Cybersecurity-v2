import { AnimatePresence } from 'framer-motion'
import SwirlBackground from './components/SwirlBackground.jsx'
import StartScreen from './components/StartScreen.jsx'
import OnboardingScreen from './components/OnboardingScreen.jsx'
import ScenarioIntro from './components/ScenarioIntro.jsx'
import NodeScreen from './components/NodeScreen.jsx'
import ConsequenceScreen from './components/ConsequenceScreen.jsx'
import ScenarioReportScreen from './components/ScenarioReportScreen.jsx'
import EndScreen from './components/EndScreen.jsx'
import { scenarios } from './content/scenarios.js'
import { useGameState } from './engine/gameState.js'

export default function App() {
  const game = useGameState(scenarios)
  const scenario = scenarios[game.state.currentScenarioIndex]
  const node = scenario?.nodes.find((item) => item.id === game.state.currentNodeId)

  return (
    <main className="app-shell">
      <SwirlBackground image={scenario?.image} />
      <AnimatePresence mode="wait">
        {game.state.screen === 'start' && (
          <StartScreen key="start" onStart={game.startGame} />
        )}
        {game.state.screen === 'onboarding' && (
          <OnboardingScreen key="onboarding" onContinue={game.finishOnboarding} />
        )}
        {game.state.screen === 'intro' && scenario && (
          <ScenarioIntro key={`intro-${scenario.id}`} scenario={scenario} onContinue={game.finishIntro} />
        )}
        {game.state.screen === 'node' && scenario && node && (
          <NodeScreen
            key={`${scenario.id}-${node.id}`}
            scenario={scenario}
            node={node}
            state={game.state}
            onChoice={game.makeChoice}
          />
        )}
        {/* Defensive: node not found while on node screen → skip to scenario report */}
        {game.state.screen === 'node' && scenario && !node && (
          <ScenarioReportScreen
            key={`report-fallback-${scenario.id}`}
            scenario={scenario}
            state={game.state}
            onAdvance={game.advanceFromScenarioReport}
            isLastScenario={game.state.currentScenarioIndex >= scenarios.length - 1}
          />
        )}
        {game.state.screen === 'consequence' && game.state.pendingOutcome && (
          <ConsequenceScreen
            key={`${game.state.pendingOutcome.scenarioId}-${game.state.pendingOutcome.nodeId}-${game.state.pendingOutcome.choice.id}`}
            outcome={game.state.pendingOutcome}
            state={game.state}
            onContinue={game.continueAfterConsequence}
          />
        )}
        {game.state.screen === 'scenario_report' && scenario && (
          <ScenarioReportScreen
            key={`report-${scenario.id}`}
            scenario={scenario}
            state={game.state}
            onAdvance={game.advanceFromScenarioReport}
            isLastScenario={game.state.currentScenarioIndex >= scenarios.length - 1}
          />
        )}
        {game.state.screen === 'end' && (
          <EndScreen key="end" state={game.state} scenarios={scenarios} onRestart={game.restart} />
        )}
      </AnimatePresence>
    </main>
  )
}
