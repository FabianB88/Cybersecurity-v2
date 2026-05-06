import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function DossierCard({ item }) {
  const [open, setOpen] = useState(false)
  const Icon = open ? ChevronDown : ChevronRight

  return (
    <button className={`dossier-card ${open ? 'open' : ''}`} onClick={() => setOpen((value) => !value)}>
      <span className="dossier-card-head">
        <Icon size={15} />
        <strong>{item.title}</strong>
      </span>
      {open && <span className="dossier-card-body">{item.text}</span>}
    </button>
  )
}
