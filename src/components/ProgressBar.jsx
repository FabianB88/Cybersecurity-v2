export default function ProgressBar({ scenario, node, state }) {
  const currentIndex = scenario.nodes.findIndex((item) => item.id === node.id)
  return (
    <div className="progress-block">
      <div className="progress-meta">
        <span>{scenario.title}</span>
        <span>Beslissing {currentIndex + 1}/{scenario.nodes.length}</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${((currentIndex + 1) / scenario.nodes.length) * 100}%` }}
        />
      </div>
      <div className="campaign-track">
        {Array.from({ length: 6 }).map((_, index) => (
          <span
            key={index}
            className={index < state.currentScenarioIndex ? 'done' : index === state.currentScenarioIndex ? 'active' : ''}
          />
        ))}
      </div>
    </div>
  )
}
