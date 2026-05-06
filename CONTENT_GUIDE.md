# Content editing guide

CyberDetective is data-driven. Most writing changes should happen in:

```text
src/content/scenarios.js
src/content/outcomes.js
src/content/glossary.js
```

## Scenario structure

Each scenario has metadata, an intro, impact stats and nodes.

```js
{
  id: 'odido',
  title: 'Odido Datalek',
  year: '2023',
  sector: 'Telecom / Leveranciersrisico',
  role: 'IT-operations manager',
  cia: ['Confidentiality'],
  tbkLens: 'Leverancierstoegang',
  image: imageManifest.odido,
  intro: ['Paragraph 1', 'Paragraph 2'],
  impactStats: [
    { value: '72u', label: 'AVG-meldtermijn' }
  ],
  nodes: []
}
```

## Node structure

Each node is one decision screen.

```js
{
  id: 'avg',
  title: 'De AVG-klok',
  tbkTags: ['Compliance', 'Klantcommunicatie'],
  situation: 'Context text shown above the question.',
  question: 'What should the student decide?',
  choices: []
}
```

Every node automatically receives clickable dossier cards based on scenario metadata and `tbkTags`. Later, this can be made more specific by adding a `dossier` array to a node; the UI is already built around the concept of students opening information before choosing.

## Choice structure

Choices control branching and the final profile.

```js
choice(
  'A',
  'Short label',
  'Longer clickable text',
  q.best,                 // q.best | q.acceptable | q.risky
  'next-node-id',          // or 'end_scenario'
  { proces: 2, tech: 1 },  // vulnerability categories
  { operation: 1 },        // damage meters
  'Consequence text'
)
```

After every choice, the app now shows a consequence scene before moving on. The `consequence` field should therefore be written as a short story result, not as a one-line score note.

Good consequence style:

```text
De productievloer valt stil. Binnen twintig minuten staat BMW opnieuw aan de lijn, maar IT meldt dat de besmetting zich niet verder verspreidt. Je hebt omzet verloren, maar het incident blijft begrensd.
```

Weak consequence style:

```text
Productie stopt. Minder risico.
```

## Rules for editing

- Keep every node `id` unique inside a scenario.
- Every `next` must point to an existing node id or `end_scenario`.
- Use `q.best`, `q.acceptable` and `q.risky`; avoid hard right/wrong thinking.
- Use TBK tags to connect gameplay to the workshop: `Productiecontinuiteit`, `Ketenafhankelijkheid`, `Leveranciersmanagement`, `Interne controle`, `Business continuity`.
- If content is still placeholder, keep the structure stable and replace only text fields.
- Write every consequence as: immediate event, operational effect, new uncertainty.
- Stronger future content should add more forks: choices can point to different `next` nodes, so one scenario can have separate branches for early isolation, risky continuation, legal escalation or operational compromise.

## Images

Image paths are defined in:

```text
src/assets/imageManifest.js
```

Local files live in:

```text
public/images/
```

The app first tries the local image. If it fails, it uses the remote fallback URL.
