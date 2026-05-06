import { CheckCircle2, Circle } from 'lucide-react'

export default function ChoiceButton({ choice, selected, disabled, onSelect }) {
  const Icon = selected ? CheckCircle2 : Circle

  return (
    <button className={`choice-button ${selected ? 'selected' : ''}`} disabled={disabled} onClick={() => onSelect(choice.id)}>
      <span className="choice-key">{choice.id}</span>
      <span className="choice-body">
        <strong>{choice.label}</strong>
        <span>{choice.text}</span>
      </span>
      <Icon size={18} />
    </button>
  )
}
