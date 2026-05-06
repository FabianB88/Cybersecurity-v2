import { Siren } from 'lucide-react'

export default function IncidentCard({ incident }) {
  return (
    <article className="incident-card">
      <Siren size={18} />
      <div>
        <h3>{incident.title}</h3>
        <p>{incident.text}</p>
      </div>
    </article>
  )
}
