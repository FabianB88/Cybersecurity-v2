export const blindSpotMessages = {
  late_action:
    'Je wachtte vaak op meer zekerheid terwijl snelle isolatie of verificatie het verschil maakte. In je praktijkcasus: onderzoek wie mag beslissen bij tijdsdruk.',
  no_protocol:
    'Je keuzes wijzen op procesrisico: afspraken, eigenaarschap of controles ontbreken. In je praktijkcasus: kijk naar toegangsbeheer, leveranciers en incidentprocedures.',
  trust_tech:
    'Je vertrouwde vaak op losse technische oplossingen. In je praktijkcasus: onderzoek of systemen, processen en verantwoordelijkheden samen werken.',
  human_pressure:
    'Je was gevoelig voor druk, vertrouwen of schijnbare urgentie. In je praktijkcasus: kijk hoe medewerkers hulp krijgen bij twijfel en social engineering.',
  general:
    'Je profiel is gemengd. Gebruik de onderzoeksvragen hieronder om de praktijkcasus breed te verkennen.',
}

export const casusTips = {
  mens: {
    tip: 'Let op gedrag, training, cultuur en druk in beslissingen.',
    questions: [
      'Welke medewerkers kunnen onder tijdsdruk kritieke beslissingen nemen?',
      'Hoe worden medewerkers getraind op phishing, datagebruik en betaalfraude?',
      'Is er een cultuur waarin twijfel snel en veilig kan worden gemeld?',
    ],
  },
  proces: {
    tip: 'Let op afspraken, eigenaarschap, leveranciers en controles.',
    questions: [
      'Wie is eigenaar van toegangsrechten van medewerkers en leveranciers?',
      'Hoe wordt gecontroleerd of autorisaties, updates en back-ups echt kloppen?',
      'Wat gebeurt er wanneer een medewerker of leverancier vertrekt?',
    ],
  },
  tech: {
    tip: 'Let op MFA, segmentatie, patching, monitoring en herstelbaarheid.',
    questions: [
      'Wordt MFA gebruikt op systemen die van buiten bereikbaar zijn?',
      'Zijn kritieke systemen gescheiden zodat een aanval niet alles raakt?',
      'Zijn back-ups offline, getest en snel herstelbaar?',
    ],
  },
}

export const incidentLibrary = {
  mens: [
    {
      title: 'Spoedbetaling naar fraudeur',
      text: 'Een medewerker vertrouwde een urgente directiemail en liet een betaling doorgaan zonder tweede kanaal.',
    },
    {
      title: 'Phishingaccount misbruikt',
      text: 'Een gestolen login gaf aanvallers toegang tot mailboxen en interne documenten.',
    },
  ],
  proces: [
    {
      title: 'Leverancier had te veel toegang',
      text: 'Een externe partij kon meer klantdata exporteren dan nodig was voor de opdracht.',
    },
    {
      title: 'Ex-medewerker bleef actief',
      text: 'Toegang werd na vertrek niet ingetrokken, waardoor gevoelige bestanden bereikbaar bleven.',
    },
  ],
  tech: [
    {
      title: 'Ransomware verspreidde zich breed',
      text: 'Door ontbrekende segmentatie raakten kantoor-IT, planning en operatie tegelijk verstoord.',
    },
    {
      title: 'Herstel duurde dagen langer',
      text: 'Back-ups waren niet offline getest, waardoor herstel langzaam en onzeker werd.',
    },
  ],
}

export const groupAssignment = {
  title: 'Neem mee naar je groep',
  steps: [
    'Kies welk incident het meest lijkt op jullie praktijkbedrijf.',
    'Bepaal welk bedrijfsproces daardoor het kwetsbaarst is.',
    'Formuleer een haalbare maatregel en een onderzoeksvraag.',
  ],
  formula:
    'Risico: [incident] kan optreden doordat [oorzaak]. Dit raakt [CIA-principe] en leidt tot [bedrijfskundig gevolg]. Een passende maatregel is [maatregel], omdat [reden].',
}
