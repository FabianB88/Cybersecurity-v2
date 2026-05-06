import { imageManifest } from '../assets/imageManifest.js'

const q = { best: 'best', acceptable: 'acceptable', risky: 'risky' }

function choice(id, label, text, quality, next, risk, meters, consequence, forkLabel) {
  const obj = { id, label, text, quality, next, risk, meters, consequence }
  if (forkLabel) obj.forkLabel = forkLabel
  return obj
}

const pathe = {
  id: "pathe",
  title: "Pathé: CEO-fraude",
  year: "2018",
  sector: "Entertainment",
  role: "Financieel manager Pathé Nederland",
  cia: [
    "Integrity",
    "Confidentiality",
  ],
  category: [
    "mens",
    "proces",
  ],
  tbkLens: "Interne controle en governance",
  accent: "#e50914",
  image: imageManifest.pathe,
  allowCollapse: false,
  sources: [
    "NOS",
    "NRC",
    "FD",
  ],
  collapse: {
    title: "Fraude volledig geslaagd",
    text: "Alle betalingen verwerkt. Schade overstijgt EUR 15 miljoen.",
  },
  intro: [
    "Woensdag 12 september 2018 — 08:12 uur. Als financieel manager bij Pathé Nederland ontvang je een mail van ceo@pathefr-group.com over een vertrouwelijke internationale overname. Documenten, directeurnamen en juridische clausules — alles klopt.",
    "Dit scenario laat zien hoe cybercriminaliteit ook zonder malware enorme schade aanricht via sociale manipulatie, tijdsdruk en proceszwaktes.",
  ],
  impactStats: [
    {
      value: "€19M",
      label: "fraudeschade",
    },
    {
      value: "CEO-fraude",
      label: "aanvaltype",
    },
    {
      value: "geen malware",
      label: "alleen manipulatie",
    },
  ],
  reflection: {
    summary: "Pathé toont hoe tijdsdruk, hiërarchie en vertrouwen samen een veiligheidsrisico vormen zonder dat een technisch systeem is gehackt.",
    cia: "Focus op Integrity en Confidentiality: de aanvaller gebruikt vertrouwelijke informatie om processen te manipuleren.",
    tbk: "TBK-bril: interne controle. Welke verificatiestappen ontbraken en hoe voorkom je dat sociale druk normale procedures omzeilt?",
    questions: [
      "Welke financiële processen zijn kwetsbaar voor sociale manipulatie?",
      "Wie heeft de bevoegdheid grote betalingen goed te keuren?",
      "Hoe wordt urgentie gebruikt om controleprocedures te omzeilen?",
    ],
  },
  nodes: [
    {
      id: "k1",
      forkPoint: true,
      title: "Eerste betalingsverzoek",
      tbkTags: [
        "Interne controle",
        "Governance",
        "Besluitvorming",
      ],
      situation: "09:00 uur. De gevraagde betaling bedraagt €800.000. Documenten, interne projectnamen en directeurnamen zijn aanwezig. De beller benadrukt vertrouwelijkheid en haast.",
      question: "Hoe reageer je op dit betalingsverzoek?",
      choices: [
        {
          id: "A",
          label: "Onafhankelijk verifiëren",
          text: "Neem buiten de mail om contact op via het officiële nummer van Pathé Frankrijk.",
          quality: "best",
          next: "k2a",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            recovery: 1,
            trust: 1,
          },
          consequence: "Via het officiële nummer bestaat geen internationale overname. Fraude vroeg ontdekt.",
          forkLabel: "Pad A: Verificatie",
        },
        {
          id: "B",
          label: "Instructies volgen",
          text: "Volg de instructies zodat de deal geen vertraging oploopt.",
          quality: "risky",
          next: "k2b",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            financial: 2,
            pressure: 2,
          },
          consequence: "De betaling gaat door. Een tweede groter verzoek volgt direct.",
          forkLabel: "Pad B: Uitvoering",
        },
        {
          id: "C",
          label: "Meer onderbouwing vragen",
          text: "Vraag aanvullende documentatie voordat je beslist.",
          quality: "acceptable",
          next: "k2c",
          risk: {
            mens: 1,
            proces: 1,
          },
          meters: {
            recovery: 1,
            pressure: 1,
          },
          consequence: "De tegenpartij stuurt extra documenten. Je wint tijd maar de fraude houdt stand.",
          forkLabel: "Pad C: Analyse",
        },
      ],
    },
    {
      id: "k2a",
      forkPoint: true,
      title: "Fraude vroeg ontdekt",
      tbkTags: [
        "Escalatie",
        "Crisismanagement",
      ],
      situation: "10:15 uur. Het officiële hoofdkantoor weet niets van een overname. Crisisoverleg start direct. Security officer: meerdere medewerkers zijn benaderd.",
      question: "Hoe pak je de crisissituatie aan?",
      choices: [
        {
          id: "A",
          label: "Direct extern melden",
          text: "Meld bij bank, politie en het hoofdkantoor in Parijs.",
          quality: "best",
          next: "k3a",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            trust: 1,
            recovery: 1,
          },
          consequence: "Snelle escalatie beperkt vervolgschade. De bank kan transacties mogelijk blokkeren.",
        },
        {
          id: "B",
          label: "Intern onderzoek eerst",
          text: "Breng intern in kaart welke medewerkers zijn benaderd voor je naar buiten treedt.",
          quality: "acceptable",
          next: "k3b",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            reputation: 1,
          },
          consequence: "Je wint inzicht maar verliest kostbare tijd voor mogelijke blokkering.",
        },
      ],
    },
    {
      id: "k2b",
      forkPoint: true,
      title: "Tweede betalingsverzoek",
      tbkTags: [
        "Procesdiscipline",
        "Tijdsdruk",
      ],
      situation: "14:00 uur. Een tweede verzoek: €4,2 miljoen. Kortere deadlines, meer vertrouwelijkheid, minder detail.",
      question: "Wat doe je bij dit grotere urgentere verzoek?",
      choices: [
        {
          id: "A",
          label: "Alsnog onafhankelijk contact",
          text: "De tweede instructie wijkt af van normale processen. Je zoekt verificatie via het officiële kanaal.",
          quality: "best",
          next: "k3a",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            trust: 1,
            recovery: 1,
          },
          consequence: "Fraude alsnog ontdekt. Eerste betaling is schade, tweede is geblokkeerd.",
        },
        {
          id: "B",
          label: "Traject voortzetten",
          text: "De eerdere communicatie was overtuigend genoeg.",
          quality: "risky",
          next: "k3c",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            financial: 3,
            reputation: 2,
            pressure: 2,
          },
          consequence: "Beide betalingen verwerkt. Totale schade loopt op tot meer dan €5 miljoen.",
        },
      ],
    },
    {
      id: "k2c",
      forkPoint: true,
      title: "De vertrouwensfase",
      tbkTags: [
        "Verificatie",
        "Sociale manipulatie",
      ],
      situation: "11:30 uur. Nieuwe documenten: tijdlijnen, contractnummers, NDA's. De communicatie blijft professioneel.",
      question: "Extra verificatie of doorgaan met het traject?",
      choices: [
        {
          id: "A",
          label: "Toch onafhankelijk verifiëren",
          text: "Je zoekt buiten de communicatielijn bevestiging via het officiële kanaal.",
          quality: "best",
          next: "k3a",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            trust: 2,
            recovery: 1,
          },
          consequence: "Fraude ontdekt. De aanvaller had geen rekening gehouden met verificatie buiten het fraudekanaal.",
        },
        {
          id: "B",
          label: "Eerste betaling uitvoeren",
          text: "De informatie sluit aan op hoe internationale transacties kunnen verlopen.",
          quality: "risky",
          next: "k3c",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            financial: 2,
            pressure: 2,
          },
          consequence: "Betaling verwerkt. Snel volgt een verzoek voor een veel groter bedrag.",
        },
      ],
    },
    {
      id: "k3a",
      forkPoint: true,
      title: "Incident geblokkeerd",
      tbkTags: [
        "Communicatie",
        "Herstelstrategie",
      ],
      situation: "Dag 2. De fraude is gestopt. De bank onderzoekt terugboekingen. De directie bespreekt de communicatiestrategie.",
      question: "Hoe communiceer je intern over het incident?",
      choices: [
        {
          id: "A",
          label: "Open naar medewerkers",
          text: "Informeer medewerkers en hoofdkantoor over signalen, werking en vervolgstappen.",
          quality: "best",
          next: "k4a",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 2,
            recovery: 1,
          },
          consequence: "Openheid vergroot alertheid. Vergelijkbare pogingen worden sneller herkend.",
        },
        {
          id: "B",
          label: "Beperkte communicatie",
          text: "Houd communicatie beperkt tot een kleine kring totdat alles duidelijk is.",
          quality: "acceptable",
          next: "k4b",
          risk: {
            mens: 1,
            proces: 1,
          },
          meters: {
            reputation: 1,
          },
          consequence: "Voorzichtig maar riskant: andere benaderde medewerkers weten niet dat ze onderdeel zijn van dezelfde aanval.",
        },
      ],
    },
    {
      id: "k3b",
      forkPoint: true,
      title: "Twijfel in de organisatie",
      tbkTags: [
        "Governance",
        "Meldcultuur",
      ],
      situation: "Dag 2. Legal, finance en IT interpreteren de situatie elk anders. Meerdere medewerkers ontvingen vergelijkbare fraudeberichten.",
      question: "Welke maatregel is het meest urgent?",
      choices: [
        {
          id: "A",
          label: "Grote betalingen pauzeren",
          text: "Stop tijdelijk alle grote internationale betalingen voor extra controle.",
          quality: "best",
          next: "k4a",
          risk: {
            proces: 2,
            mens: 1,
          },
          meters: {
            recovery: 2,
          },
          consequence: "Extra controle geeft tijd om het incident goed in kaart te brengen.",
        },
        {
          id: "B",
          label: "Alleen gerelateerde transacties",
          text: "Controleer alleen transacties die direct verband houden met deze zaak.",
          quality: "acceptable",
          next: "k4b",
          risk: {
            proces: 1,
            mens: 1,
          },
          meters: {
            financial: 1,
          },
          consequence: "Minimale verstoring maar vergelijkbare pogingen kunnen doorgang vinden.",
        },
      ],
    },
    {
      id: "k3c",
      forkPoint: true,
      title: "Grote financiële schade",
      tbkTags: [
        "Reputatiemanagement",
        "Crisismanagement",
      ],
      situation: "Dag 3. Hoofdkantoor ontdekt onverwachte transacties. Totale schade: meer dan €5 miljoen. Media stellen vragen.",
      question: "Hoe reageer je op de toegenomen externe druk?",
      choices: [
        {
          id: "A",
          label: "Open communiceren",
          text: "Leg uit wat bekend is, welke stappen volgen en hoe processen worden aangepast.",
          quality: "best",
          next: "k4a",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 1,
            recovery: 1,
          },
          consequence: "Transparantie toont grip op de situatie en beperkt reputatieschade.",
        },
        {
          id: "B",
          label: "Herstel financieel eerst",
          text: "Focus op terugboekingen en interne analyse voordat je extern communiceert.",
          quality: "risky",
          next: "k4c",
          risk: {
            proces: 2,
            mens: 1,
          },
          meters: {
            reputation: 3,
            pressure: 2,
          },
          consequence: "Media-aandacht groeit. Het narratief wordt bepaald door buitenstaanders.",
        },
      ],
    },
    {
      id: "k4a",
      title: "Bestuursvergadering",
      tbkTags: [
        "Procesverbetering",
        "Governance",
      ],
      situation: "Week 2. CFO, IT-manager en HR bespreken drie richtingen: financiële controles, technische detectie of bewustwording.",
      question: "Welke structurele maatregel verdient als eerste aandacht?",
      choices: [
        {
          id: "A",
          label: "Vierogenprincipe",
          text: "Grote transacties vereisen meerdere goedkeuringen via gescheiden kanalen.",
          quality: "best",
          next: "k5",
          risk: {
            proces: 2,
            mens: 1,
          },
          meters: {
            recovery: 2,
          },
          consequence: "Een hard procescontrolemechanisme dat sociale druk structureel doorbreekt.",
        },
        {
          id: "B",
          label: "Awarenesscampagne",
          text: "Organisatiebrede training op meldcultuur en herkenning van manipulatie.",
          quality: "best",
          next: "k5",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 1,
            recovery: 1,
          },
          consequence: "Mensen zijn de eerste verdedigingslinie. Training verhoogt weerbaarheid.",
        },
        {
          id: "C",
          label: "Technische detectie",
          text: "Investeer in e-mailfiltering en monitoring van verdachte betaalpatronen.",
          quality: "acceptable",
          next: "k5",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            recovery: 1,
          },
          consequence: "Techniek helpt maar CEO-fraude omzeilt filters via geloofwaardige communicatie.",
        },
      ],
    },
    {
      id: "k4b",
      title: "Operationele spanning",
      tbkTags: [
        "Procescontrole",
        "Continuiteit",
      ],
      situation: "Week 2. Extra verificatiestappen veroorzaken vertraging. Managers willen versnellen.",
      question: "Hoe balanceer je controle en continuiteit?",
      choices: [
        {
          id: "A",
          label: "Controles handhaven",
          text: "Accepteer tijdelijke vertraging totdat alle processen zijn herbeoordeeld.",
          quality: "best",
          next: "k5",
          risk: {
            proces: 2,
          },
          meters: {
            recovery: 1,
          },
          consequence: "Kortetermijnverlies, langetermijnwinst: processen zijn aantoonbaar robuuster.",
        },
        {
          id: "B",
          label: "Controles versoepelen",
          text: "Verlaag tijdelijke controles zodat operaties sneller herstellen.",
          quality: "risky",
          next: "k5",
          risk: {
            mens: 1,
            proces: 1,
          },
          meters: {
            financial: 1,
            pressure: 1,
          },
          consequence: "Operatie herstelt sneller maar kwetsbaarheid voor herhaling neemt toe.",
        },
      ],
    },
    {
      id: "k4c",
      title: "Reputatie onder druk",
      tbkTags: [
        "Communicatie",
        "Verantwoording",
      ],
      situation: "Week 3. Media publiceren over de fraudezaak. Intern ontstaat discussie over verantwoordelijkheid.",
      question: "Welk communicatieframe kies je?",
      choices: [
        {
          id: "A",
          label: "Procesverbetering centraal",
          text: "Benadruk dat dit een professioneel georkestreerde aanval was en focus op verbeteringen.",
          quality: "best",
          next: "k5",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 2,
            recovery: 1,
          },
          consequence: "Kwetsbaarheid erkennen en actie tonen is de meest geloofwaardige respons.",
        },
        {
          id: "B",
          label: "Procedure-fouten benoemen",
          text: "Benadruk intern waar afgeweken is van de afgesproken werkwijze.",
          quality: "risky",
          next: "k5",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            reputation: 2,
          },
          consequence: "Schuldvraag vergroot interne onrust en maakt toekomstige meldingen minder waarschijnlijk.",
        },
      ],
    },
    {
      id: "k5",
      title: "Evaluatie",
      tbkTags: [
        "Reflectie",
        "Leren",
      ],
      situation: "Maand 2. CEO-fraude slaagt door een combinatie van tijdsdruk, vertrouwen en ontbrekende procescontroles. Jouw keuzepatroon bepaalt welke lessen het meest relevant zijn.",
      question: "Ga door naar het definitieve advies.",
      choices: [
        {
          id: "A",
          label: "Conclusies verwerken",
          text: "Je neemt de bevindingen mee naar het definitieve advies.",
          quality: "acceptable",
          next: "k6",
          risk: {},
          meters: {},
          consequence: "De board staat klaar voor de laatste bestuursvraag.",
        },
      ],
    },
    {
      id: "k6",
      title: "Definitief advies",
      tbkTags: [
        "Structurele verbetering",
        "Governance",
      ],
      situation: "De board stelt de definitieve vraag: welke maatregel krijgt prioriteit om herhaling te voorkomen?",
      question: "Wat is jouw definitieve aanbeveling?",
      choices: [
        {
          id: "A",
          label: "Vierogenprincipe + second channel",
          text: "Grote betalingen vereisen verificatie via een tweede onafhankelijk kanaal én meerdere goedkeuringen.",
          quality: "best",
          next: "end_scenario",
          risk: {
            proces: 2,
            mens: 1,
          },
          meters: {
            recovery: 1,
          },
          consequence: "Maakt sociale druk structureel minder effectief.",
        },
        {
          id: "B",
          label: "Awareness en meldcultuur",
          text: "Bouw een cultuur waar twijfel over urgente verzoeken bespreekbaar en beloond is.",
          quality: "best",
          next: "end_scenario",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 1,
          },
          consequence: "Menselijke weerbaarheid als eerste en laatste verdedigingslinie.",
        },
        {
          id: "C",
          label: "Technische detectie",
          text: "Investeer in e-mailvalidatie en detectie van afwijkende betaalpatronen.",
          quality: "acceptable",
          next: "end_scenario",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            recovery: 1,
          },
          consequence: "Techniek ondersteunt maar omzeilt sociale manipulatie niet volledig.",
        },
      ],
    },
  ],
}

const odido = {
  id: "odido",
  title: "Odido: datalek via leverancier",
  year: "2023",
  sector: "Telecom",
  role: "Operations manager Odido",
  cia: [
    "Confidentiality",
  ],
  category: [
    "proces",
    "mens",
  ],
  tbkLens: "Leveranciersmanagement en toegangscontrole",
  accent: "#00b4d8",
  image: imageManifest.odido,
  allowCollapse: false,
  sources: [
    "NOS",
    "RTL Nieuws",
    "AP",
  ],
  collapse: {
    title: "Datalek volledig onbeheersbaar",
    text: "Voortdurende blootstelling van klantgegevens. AP legt boete op.",
  },
  intro: [
    "Vrijdag 27 januari 2023 — 09:14 uur. Als operations manager bij Odido ontvang je meldingen van klanten die via phishing worden benaderd met hun eigen IBAN en adres. Een externe IT-leverancier had toegang tot klantgegevens.",
    "In totaal werden gegevens van 6,3 miljoen klanten gelekt. Dit scenario laat zien hoe organisaties ook via leveranciers kwetsbaar zijn.",
  ],
  impactStats: [
    {
      value: "6,3M",
      label: "klanten getroffen",
    },
    {
      value: "IBAN/naam/adres",
      label: "gelekt",
    },
    {
      value: "leverancier",
      label: "toegangspunt aanval",
    },
  ],
  reflection: {
    summary: "Odido toont dat een organisatie ook via externe leveranciers kwetsbaar is, zelfs als de eigen systemen goed zijn beveiligd.",
    cia: "Focus op Confidentiality: klantgegevens waren zichtbaar via een leverancier met te ruime toegangsrechten.",
    tbk: "TBK-bril: leveranciersmanagement. Welke toegang heeft een leverancier écht nodig en hoe controleer je dat?",
    questions: [
      "Welke externe partijen hebben toegang tot klant- of bedrijfsdata?",
      "Hoe worden toegangsrechten van leveranciers periodiek gecontroleerd?",
      "Wat is het plan als een leverancier de oorzaak is van een datalek?",
    ],
  },
  nodes: [
    {
      id: "k1",
      forkPoint: true,
      title: "Eerste reactie op het datalek",
      tbkTags: [
        "Leveranciersmanagement",
        "Toegangsrechten",
        "Procescontrole",
      ],
      situation: "11:05 uur. Er is nog weinig bevestigd. Klanten merken storingen, medewerkers stellen vragen en social media pikt signalen op. De leverancier zegt: \"We onderzoeken nog wat zichtbaar was.\"",
      question: "Wat is je eerste beslissing?",
      choices: [
        {
          id: "A",
          label: "Externe toegang afsluiten",
          text: "Sluit tijdelijk alle externe toegang af totdat duidelijk is welke systemen geraakt zijn.",
          quality: "best",
          next: "k2a",
          risk: {
            proces: 2,
            tech: 1,
          },
          meters: {
            recovery: 2,
            operation: 1,
          },
          consequence: "Leveranciers en sommige interne teams kunnen tijdelijk minder goed werken, maar verdere datablootstelling stopt.",
          forkLabel: "Pad A: Isolatie",
        },
        {
          id: "B",
          label: "Leverancier laten doorwerken",
          text: "Laat de leverancier doorwerken zodat klanten zo min mogelijk hinder merken.",
          quality: "risky",
          next: "k2b",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            chain: 2,
            reputation: 1,
          },
          consequence: "Dienstverlening blijft stabiel maar het risico op verdere datablootstelling groeit elk uur.",
          forkLabel: "Pad B: Continuiteit",
        },
        {
          id: "C",
          label: "Eerst volledig overzicht vragen",
          text: "Vraag een overzicht van welke systemen zijn geraakt, wie toegang had en welke gegevens zichtbaar waren.",
          quality: "acceptable",
          next: "k2c",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            chain: 1,
            recovery: 1,
          },
          consequence: "Je wint inzicht maar verliest tijd. Elke minuut dat toegang openstaat vergroot de schade.",
          forkLabel: "Pad C: Analyse",
        },
      ],
    },
    {
      id: "k2a",
      forkPoint: true,
      title: "Systemen geïsoleerd",
      tbkTags: [
        "Incidentrespons",
        "Toegangsbeheer",
      ],
      situation: "11:45 uur. Externe toegang is afgesloten. Klantenservice heeft tijdelijk minder capaciteit. De omvang van het datalek wordt nog onderzocht.",
      question: "Wat is de volgende stap?",
      choices: [
        {
          id: "A",
          label: "Afsluiting actief houden",
          text: "Houd de isolatie actief totdat alle systemen zijn gecontroleerd.",
          quality: "best",
          next: "k3a",
          risk: {
            proces: 2,
            tech: 1,
          },
          meters: {
            recovery: 2,
            operation: 1,
          },
          consequence: "Maximale zekerheid. Het risico op verdere blootstelling wordt structureel beperkt.",
        },
        {
          id: "B",
          label: "Kritieke processen heropenen",
          text: "Herstel de toegang voor de meest kritieke klantprocessen na basis-controle.",
          quality: "acceptable",
          next: "k3b",
          risk: {
            proces: 1,
            tech: 1,
          },
          meters: {
            chain: 1,
            recovery: 1,
          },
          consequence: "Beperkt herstel van dienstverlening, maar het risico op resterende lekken bestaat nog.",
        },
      ],
    },
    {
      id: "k2b",
      forkPoint: true,
      title: "Leverancier actief, risico groeit",
      tbkTags: [
        "Leveranciersrisico",
        "Ketenverantwoordelijkheid",
      ],
      situation: "12:30 uur. De leverancier werkt door maar klanten melden dat phishinggesprekken gebruikmaken van hun eigen gegevens. Het lek is actief.",
      question: "De situatie verslechtert. Wat doe je?",
      choices: [
        {
          id: "A",
          label: "Alsnog direct isoleren",
          text: "Je besluit de leverancierstoegang nu per direct af te sluiten.",
          quality: "best",
          next: "k3a",
          risk: {
            proces: 2,
            tech: 1,
          },
          meters: {
            recovery: 1,
            chain: -1,
          },
          consequence: "Schade is er al, maar verdere blootstelling stopt. De daadkrachtige keuze, zij het laat.",
        },
        {
          id: "B",
          label: "Afwachten op bevestiging",
          text: "Je wacht op volledige bevestiging van de leverancier voordat je grote maatregelen neemt.",
          quality: "risky",
          next: "k3c",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            chain: 2,
            reputation: 2,
            pressure: 2,
          },
          consequence: "Elke minuut vertraging vergroot het aantal getroffen klanten en de reputatieschade.",
        },
      ],
    },
    {
      id: "k2c",
      forkPoint: true,
      title: "Inventarisatie loopt",
      tbkTags: [
        "Informatieverzameling",
        "Crisisanalyse",
      ],
      situation: "12:00 uur. Het overzicht wordt opgebouwd. De leverancier werkt mee maar de scope is groter dan gedacht.",
      question: "Hoe ga je verder terwijl de inventarisatie loopt?",
      choices: [
        {
          id: "A",
          label: "Getroffen systemen isoleren",
          text: "Sluit de geïdentificeerde systemen af ook al is het beeld nog onvolledig.",
          quality: "best",
          next: "k3b",
          risk: {
            proces: 2,
            tech: 1,
          },
          meters: {
            recovery: 1,
            chain: 1,
          },
          consequence: "Deeloplossing nu is beter dan volledige oplossing later. Je beperkt het lek stapsgewijs.",
        },
        {
          id: "B",
          label: "Wachten op volledig rapport",
          text: "Wacht totdat het volledige beeld helder is voor je systemen aanpast.",
          quality: "risky",
          next: "k3c",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            chain: 2,
            reputation: 1,
            pressure: 1,
          },
          consequence: "Volledig inzicht maar ondertussen loopt de blootstelling door.",
        },
      ],
    },
    {
      id: "k3a",
      forkPoint: true,
      title: "Systemen veilig, schade in kaart",
      tbkTags: [
        "AVG-compliance",
        "Autoriteit Persoonsgegevens",
      ],
      situation: "Middag. Systemen zijn geïsoleerd. De omvang wordt duidelijk: gegevens van mogelijk miljoenen klanten waren zichtbaar. De Autoriteit Persoonsgegevens moet binnen 72 uur worden geïnformeerd.",
      question: "Hoe communiceer je over het datalek?",
      choices: [
        {
          id: "A",
          label: "Direct AP en klanten informeren",
          text: "Meld het datalek direct bij de AP en informeer klanten proactief.",
          quality: "best",
          next: "k4a",
          risk: {
            mens: 2,
            proces: 2,
          },
          meters: {
            trust: 1,
            recovery: 1,
          },
          consequence: "Wettelijke verplichting wordt tijdig nagekomen. Klanten kunnen zelf maatregelen nemen.",
        },
        {
          id: "B",
          label: "Intern verder analyseren",
          text: "Breng eerst de volledige omvang in kaart voordat je extern communiceert.",
          quality: "acceptable",
          next: "k4b",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            legal: 1,
            reputation: 1,
          },
          consequence: "Meer informatie maar risico op overschrijden van de 72-uurs meldtermijn neemt toe.",
        },
      ],
    },
    {
      id: "k3b",
      forkPoint: true,
      title: "Deels operationeel",
      tbkTags: [
        "Klantcommunicatie",
        "Reputatie",
      ],
      situation: "Middag. Systemen zijn deels hersteld. Klantenservice is overbelast. Social media staat vol met berichten over het lek.",
      question: "Hoe pak je de communicatie aan?",
      choices: [
        {
          id: "A",
          label: "Klanten proactief informeren",
          text: "Stuur actief berichten naar getroffen klanten met uitleg en advies.",
          quality: "best",
          next: "k4a",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 2,
            reputation: -1,
          },
          consequence: "Transparantie beperkt verdere reputatieschade en helpt klanten zichzelf te beschermen.",
        },
        {
          id: "B",
          label: "Wachten op juridisch advies",
          text: "Wacht op juridisch advies over wat je precies mag en moet communiceren.",
          quality: "acceptable",
          next: "k4c",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            legal: 1,
            reputation: 1,
          },
          consequence: "Juridisch veilig maar klanten blijven onnodig lang in onzekerheid.",
        },
      ],
    },
    {
      id: "k3c",
      forkPoint: true,
      title: "Voortgaande datablootstelling",
      tbkTags: [
        "Crisisescalatie",
        "Reputatieschade",
      ],
      situation: "Midwijk. De blootstelling duurt voort. Media-aandacht neemt toe. De AP vraagt om een melding.",
      question: "De crisis escaleert. Wat doe je?",
      choices: [
        {
          id: "A",
          label: "Nu afsluiten en open communiceren",
          text: "Sluit systemen alsnog af en communiceer transparant over de schade.",
          quality: "best",
          next: "k4a",
          risk: {
            mens: 2,
            proces: 2,
          },
          meters: {
            trust: 1,
            recovery: 1,
          },
          consequence: "Late maar doortastende actie. Transparantie helpt vertrouwen gedeeltelijk te herstellen.",
        },
        {
          id: "B",
          label: "Intern houden",
          text: "Probeer de situatie intern te beheersen zonder externe communicatie.",
          quality: "risky",
          next: "k4c",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            reputation: 3,
            legal: 2,
            pressure: 2,
          },
          consequence: "De situatie is niet meer intern te beheersen. Externe druk neemt elke dag toe.",
        },
      ],
    },
    {
      id: "k4a",
      title: "AP-onderzoek en herstel",
      tbkTags: [
        "Wetgeving",
        "Privacy by design",
      ],
      situation: "Week 2. De AP start een onderzoek. De organisatie moet aantonen welke maatregelen zijn genomen en worden genomen.",
      question: "Welke structurele verbetering heeft prioriteit?",
      choices: [
        {
          id: "A",
          label: "Transparantie naar AP",
          text: "Bied de AP volledig inzicht in systemen, toegangsrechten en herstelmaatregelen.",
          quality: "best",
          next: "k5",
          risk: {
            mens: 2,
            proces: 2,
          },
          meters: {
            trust: 2,
            recovery: 1,
          },
          consequence: "Volledige medewerking verkleint het risico op een hoge boete.",
        },
        {
          id: "B",
          label: "Stricter leveranciersmanagement",
          text: "Implementeer direct strengere toegangscontroles voor alle externe leveranciers.",
          quality: "best",
          next: "k5",
          risk: {
            proces: 2,
            tech: 1,
          },
          meters: {
            recovery: 2,
          },
          consequence: "Pakt de kernkwetsbaarheid aan die dit incident mogelijk maakte.",
        },
        {
          id: "C",
          label: "Klanten direct schrijven",
          text: "Stuur alle getroffen klanten een persoonlijke brief met uitleg en advies.",
          quality: "best",
          next: "k5",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 1,
            reputation: -1,
          },
          consequence: "Klanten voelen zich serieus genomen. Reputatieschade wordt actief beperkt.",
        },
      ],
    },
    {
      id: "k4b",
      title: "Interne analyse verdiepen",
      tbkTags: [
        "Forensisch onderzoek",
        "Compliance",
      ],
      situation: "Week 2. Interne analyse loopt. De 72-uurs deadline van de AP nadert of is al verstreken.",
      question: "Hoe ga je om met de wettelijke verplichtingen?",
      choices: [
        {
          id: "A",
          label: "Alsnog volledig melden bij AP",
          text: "Meld ook al is de termijn overschreden met volledige openheid.",
          quality: "best",
          next: "k5",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            recovery: 1,
            legal: -1,
          },
          consequence: "Late melding maar actieve medewerking vermindert de consequenties.",
        },
        {
          id: "B",
          label: "Minimale disclosure",
          text: "Beperk de melding tot het strikt wettelijk verplichte minimum.",
          quality: "risky",
          next: "k5",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            legal: 2,
            reputation: 2,
          },
          consequence: "Juridisch risico neemt toe. De AP kan dit als onvoldoende transparantie zien.",
        },
      ],
    },
    {
      id: "k4c",
      title: "Juridische en reputatiedruk",
      tbkTags: [
        "Crisismanagement",
        "Externe communicatie",
      ],
      situation: "Week 3. AP, media en politiek stellen vragen. Klanten zijn onzeker en boos.",
      question: "Hoe reageer je op de externe druk?",
      choices: [
        {
          id: "A",
          label: "Pro-actieve communicatie",
          text: "Neem het initiatief met openheid over wat er is gebeurd en wat je doet.",
          quality: "best",
          next: "k5",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 2,
            reputation: -1,
          },
          consequence: "Proactiviteit herstelt geloofwaardigheid. Klanten en media waarderen transparantie.",
        },
        {
          id: "B",
          label: "Verdedigende houding",
          text: "Reageer alleen op directe vragen en beperk eigen communicatie.",
          quality: "risky",
          next: "k5",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            legal: 2,
            reputation: 2,
          },
          consequence: "Verdedigende houding vergroot het narratief dat de organisatie iets te verbergen heeft.",
        },
      ],
    },
    {
      id: "k5",
      title: "Evaluatie",
      tbkTags: [
        "Leveranciersmanagement",
        "Lessen",
      ],
      situation: "Maand 2. Het datalek is een mijlpaal voor de discussie over leveranciersbeveiliging in Nederland. Jouw keuzepatroon bepaalt welke lessen centraal staan.",
      question: "Ga door naar het definitieve advies.",
      choices: [
        {
          id: "A",
          label: "Conclusies verwerken",
          text: "Je neemt de bevindingen mee naar het definitieve advies.",
          quality: "acceptable",
          next: "k6",
          risk: {},
          meters: {},
          consequence: "De board staat klaar voor de laatste bestuursvraag.",
        },
      ],
    },
    {
      id: "k6",
      title: "Definitief advies",
      tbkTags: [
        "Leveranciersbeveiliging",
        "Privacy by design",
      ],
      situation: "Welke structurele maatregel krijgt prioriteit om herhaling te voorkomen?",
      question: "Wat is jouw definitieve aanbeveling?",
      choices: [
        {
          id: "A",
          label: "Stricter leveranciersmanagement",
          text: "Leveranciers krijgen alleen minimaal benodigde toegang, periodiek gecontroleerd.",
          quality: "best",
          next: "end_scenario",
          risk: {
            proces: 2,
            tech: 1,
          },
          meters: {
            recovery: 1,
          },
          consequence: "Pakt de kernkwetsbaarheid aan: toegang beperken tot wat echt nodig is.",
        },
        {
          id: "B",
          label: "Privacy by design",
          text: "Bouw systemen zo dat klantdata standaard wordt geminimaliseerd en geïsoleerd.",
          quality: "best",
          next: "end_scenario",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            recovery: 1,
          },
          consequence: "Structurele aanpak: data die er niet is kan ook niet lekken.",
        },
        {
          id: "C",
          label: "Betere incidentrespons",
          text: "Verbeter de procedures voor detectie, melding en communicatie bij datalekken.",
          quality: "acceptable",
          next: "end_scenario",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 1,
          },
          consequence: "Snellere respons beperkt schade maar lost de onderliggende kwetsbaarheid niet op.",
        },
      ],
    },
  ],
}

const banken = {
  id: "banken",
  title: "Nederlandse banken onder DDoS",
  year: "2023",
  sector: "Financiële dienstverlening",
  role: "Operations manager grote Nederlandse bank",
  cia: [
    "Availability",
  ],
  category: [
    "proces",
    "mens",
  ],
  tbkLens: "Continuïteit en klantvertrouwen",
  accent: "#1e40af",
  image: imageManifest.banks,
  allowCollapse: false,
  sources: [
    "NOS",
    "DNB",
    "Betaalvereniging Nederland",
  ],
  collapse: {
    title: "Systemen volledig overbelast",
    text: "Betalingsverkeer ligt landelijk plat. Maatschappelijke druk is onbeheersbaar.",
  },
  intro: [
    "Dinsdag 28 maart 2023 — 08:07 uur. Als operations manager bij een grote Nederlandse bank kleuren dashboards rood. Internetbankieren reageert traag, iDEAL-betalingen vallen uit, mobiele apps laden niet meer.",
    "De aanval is geen hack maar een overspoeling: DDoS. Systemen zijn niet kapot maar raken overbelast. Dit scenario laat zien hoe digitale beschikbaarheid de ruggengraat is van moderne dienstverlening.",
  ],
  impactStats: [
    {
      value: "iDEAL offline",
      label: "uren lang",
    },
    {
      value: "DDoS",
      label: "aanvaltype",
    },
    {
      value: "landelijk",
      label: "maatschappelijke impact",
    },
  ],
  reflection: {
    summary: "Banken toont dat een organisatie niet hoeft te worden gehackt om volledig ontwricht te raken. Beschikbaarheid is ook een beveiligingsvraagstuk.",
    cia: "Focus op Availability: systemen zijn niet gehackt maar door overbelasting onbereikbaar voor klanten en ondernemers.",
    tbk: "TBK-bril: continuïteit. Welke processen moeten altijd beschikbaar blijven en wat doe je als dat niet lukt?",
    questions: [
      "Welke digitale diensten zijn in jullie praktijkbedrijf essentieel voor dagelijkse operatie?",
      "Wat zijn de gevolgen als klanten of leveranciers urenlang geen toegang hebben?",
      "Hoe communiceer je bij een technische storing zonder dat dit paniek veroorzaakt?",
    ],
  },
  nodes: [
    {
      id: "k1",
      forkPoint: true,
      title: "Eerste reactie — DDoS bevestigd",
      tbkTags: [
        "Continuïteit",
        "Crisismanagement",
        "Klantvertrouwen",
      ],
      situation: "08:25 uur. Security bevestigt een DDoS-aanval: enorme hoeveelheden verkeer overspoelen de systemen. Systemen zijn niet kapot maar raken overbelast.",
      question: "Wat is je eerste beslissing?",
      choices: [
        {
          id: "A",
          label: "Extra beveiligingsfilters",
          text: "Schakel filters in om verkeer agressiever te blokkeren. Sommige klanten kunnen tijdelijk problemen ervaren.",
          quality: "acceptable",
          next: "k2a",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            recovery: 2,
            pressure: 1,
          },
          consequence: "Filters zijn actief. De aanval vertraagt deels maar ook legitiem klantverkeer wordt soms geblokkeerd.",
          forkLabel: "Pad A: Bescherming",
        },
        {
          id: "B",
          label: "Systemen open houden",
          text: "Houd systemen zoveel mogelijk open zodat klanten bereikbaar blijven.",
          quality: "risky",
          next: "k2b",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            operation: 2,
            trust: 1,
          },
          consequence: "Klanten kunnen soms nog inloggen maar prestaties verslechteren snel.",
          forkLabel: "Pad B: Bereikbaarheid",
        },
        {
          id: "C",
          label: "Eerst informatie verzamelen",
          text: "Verzamel meer informatie over welke systemen geraakt zijn voor je grote maatregelen neemt.",
          quality: "best",
          next: "k2c",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            recovery: 1,
            reputation: 1,
          },
          consequence: "Je stelt snelle actie uit maar begrijpt het incident beter. De aanval groeit ondertussen door.",
          forkLabel: "Pad C: Analyse",
        },
      ],
    },
    {
      id: "k2a",
      forkPoint: true,
      title: "Filters actief — klanten geblokkeerd",
      tbkTags: [
        "Technische maatregelen",
        "Klantimpact",
      ],
      situation: "08:42 uur. Extra filters zijn actief. De aanval vertraagt deels maar normale klanten ervaren ook problemen. Winkels melden mislukte iDEAL-betalingen.",
      question: "Hoe lang houd je de filters actief?",
      choices: [
        {
          id: "A",
          label: "Filters handhaven",
          text: "Houd de filters actief totdat de aanval duidelijk afneemt.",
          quality: "risky",
          next: "k3a",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            recovery: 2,
            pressure: 2,
          },
          consequence: "Maximale bescherming maar klantpaniek groeit. Ondernemers melden dat klanten weglopen.",
        },
        {
          id: "B",
          label: "Blokkades verminderen",
          text: "Pas de filters bij zodat meer legitiem klantverkeer doorkomt.",
          quality: "acceptable",
          next: "k3b",
          risk: {
            tech: 1,
            proces: 1,
          },
          meters: {
            operation: 1,
            recovery: 1,
          },
          consequence: "Beperkt herstel van bereikbaarheid maar de aanval heeft meer effect.",
        },
      ],
    },
    {
      id: "k2b",
      forkPoint: true,
      title: "Open systemen — verslechterende prestaties",
      tbkTags: [
        "Operationele druk",
        "Ketenimpact",
      ],
      situation: "08:51 uur. Systemen blijven open maar prestaties verslechteren snel. Security: als de aanval groeit kunnen systemen volledig vastlopen.",
      question: "De situatie verslechtert snel. Wat doe je?",
      choices: [
        {
          id: "A",
          label: "Alsnog extra beveiligingsmaatregelen",
          text: "Schakel alsnog beschermingsfilters in en accepteer extra vertraging.",
          quality: "acceptable",
          next: "k3a",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            recovery: 2,
            operation: 1,
          },
          consequence: "Bescherming neemt toe. Klanten merken meer hinder maar systemen worden stabieler.",
        },
        {
          id: "B",
          label: "Bereikbaarheid blijft prioriteit",
          text: "Blijf maximale bereikbaarheid voor klanten nastreven.",
          quality: "risky",
          next: "k3c",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            pressure: 2,
            operation: 2,
            reputation: 1,
          },
          consequence: "Systemen raken volledig overbelast. Klantenservice loopt vast.",
        },
      ],
    },
    {
      id: "k2c",
      forkPoint: true,
      title: "Analyse loopt — aanval verspreidt zich",
      tbkTags: [
        "Informatieverzameling",
        "Communicatiestrategie",
      ],
      situation: "09:02 uur. Security: de aanval verspreidt zich waarschijnlijk over meerdere netwerken tegelijk. NOS en social media beginnen over storingen te berichten.",
      question: "Hoe communiceer je terwijl de analyse loopt?",
      choices: [
        {
          id: "A",
          label: "Open over cyberaanval",
          text: "Communiceer direct publiekelijk dat er een cyberaanval plaatsvindt.",
          quality: "best",
          next: "k3b",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 2,
            reputation: 1,
          },
          consequence: "Klanten waarderen de openheid. Media-aandacht groeit maar het narratief is in jouw handen.",
        },
        {
          id: "B",
          label: "Alleen technische storing",
          text: "Communiceer voorlopig alleen dat er technische storingen zijn.",
          quality: "risky",
          next: "k3c",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            reputation: 2,
            trust: -1,
          },
          consequence: "Klanten zijn onzeker. Als de waarheid uitlekt via media verlies je de regie over het verhaal.",
        },
      ],
    },
    {
      id: "k3a",
      forkPoint: true,
      title: "Landelijke verstoring",
      tbkTags: [
        "Ketenafhankelijkheid",
        "Prioriteiten",
      ],
      situation: "10:15 uur. Ondanks maatregelen blijven systemen instabiel. Winkels, supermarkten en tankstations melden mislukte pinbetalingen. NOS opent: Landelijke verstoring raakt digitaal betalingsverkeer.",
      question: "Hoe prioriteer je de schaarse capaciteit?",
      choices: [
        {
          id: "A",
          label: "Kritieke betaalsystemen first",
          text: "Focus op systemen die direct betalingsverkeer ondersteunen, ook als andere diensten tijdelijk minder beschikbaar zijn.",
          quality: "best",
          next: "k4a",
          risk: {
            proces: 2,
            tech: 1,
          },
          meters: {
            recovery: 2,
            operation: 1,
          },
          consequence: "Betalingsverkeer stabiliseert. Andere diensten zijn tijdelijk beperkt maar de kern houdt stand.",
        },
        {
          id: "B",
          label: "Alles tegelijk beschikbaar",
          text: "Probeer alle diensten tegelijk beschikbaar te houden voor alle klantgroepen.",
          quality: "risky",
          next: "k4b",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            operation: 2,
            pressure: 1,
          },
          consequence: "Breed aanbod maar niets werkt echt goed. Klanten zijn gefrustreerd door trage systemen.",
        },
      ],
    },
    {
      id: "k3b",
      forkPoint: true,
      title: "Open communicatie — aandacht groeit",
      tbkTags: [
        "Klantcommunicatie",
        "Reputatie",
      ],
      situation: "10:40 uur. De bank communiceert actief. Klanten waarderen de openheid maar media-aandacht groeit snel. Ondernemers melden dat klanten hun winkel verlaten.",
      question: "Hoe beheer je de communicatiestroom?",
      choices: [
        {
          id: "A",
          label: "Regelmatige publieke updates",
          text: "Publiceer elke 30 minuten updates over impact, herstel en verwachte beschikbaarheid.",
          quality: "best",
          next: "k4a",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 2,
            reputation: -1,
          },
          consequence: "Klanten en media zijn goed geïnformeerd. Onzekerheid en paniek blijven beheersbaar.",
        },
        {
          id: "B",
          label: "Korte statusmeldingen",
          text: "Beperk communicatie tot korte statusmeldingen om onrust te beperken.",
          quality: "acceptable",
          next: "k4c",
          risk: {
            mens: 1,
            proces: 1,
          },
          meters: {
            reputation: 1,
            trust: -1,
          },
          consequence: "Minder media-aandacht maar klanten voelen zich onvoldoende geïnformeerd.",
        },
      ],
    },
    {
      id: "k3c",
      forkPoint: true,
      title: "Druk loopt op — andere banken geraakt",
      tbkTags: [
        "Samenwerking",
        "Nationale coördinatie",
      ],
      situation: "11:05 uur. Andere banken melden vergelijkbare aanvallen. Klantenservice is volledig overbelast. De overheid vraagt gezamenlijk optreden.",
      question: "Werk je samen of focus je intern?",
      choices: [
        {
          id: "A",
          label: "Samenwerken met andere banken",
          text: "Werk actief samen met andere banken en nationale instanties om de aanval gezamenlijk te beperken.",
          quality: "best",
          next: "k4a",
          risk: {
            mens: 2,
            proces: 2,
          },
          meters: {
            recovery: 2,
            trust: 1,
          },
          consequence: "Gezamenlijke aanpak vergroot de effectiviteit. Informatie-uitwisseling helpt alle partijen.",
        },
        {
          id: "B",
          label: "Intern focussen",
          text: "Focus eerst volledig op het herstellen van eigen systemen.",
          quality: "risky",
          next: "k4c",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            operation: 2,
            reputation: 2,
          },
          consequence: "Eigen systemen krijgen maximale aandacht maar de aanval kan breder blijven doorgaan.",
        },
      ],
    },
    {
      id: "k4a",
      title: "Crisisoverleg — aanval neemt af",
      tbkTags: [
        "Structurele verbetering",
        "Continuïteitsplanning",
      ],
      situation: "Dag 2. De aanval neemt langzaam af. De organisatie bespreekt hoe toekomstige verstoringen beperkt kunnen worden.",
      question: "Welke structurele verbetering krijgt prioriteit?",
      choices: [
        {
          id: "A",
          label: "Prioriteiten voor kritieke systemen",
          text: "Stel vooraf vast welke systemen absoluut beschikbaar moeten blijven tijdens aanvallen.",
          quality: "best",
          next: "k5",
          risk: {
            proces: 2,
            tech: 1,
          },
          meters: {
            recovery: 2,
          },
          consequence: "Duidelijke prioriteiten voorkomen dat teams langs elkaar heen werken bij de volgende aanval.",
        },
        {
          id: "B",
          label: "Crisiscommunicatie verbeteren",
          text: "Verbeter procedures voor klantcommunicatie zodat onzekerheid en paniek beperkt blijven.",
          quality: "best",
          next: "k5",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 2,
          },
          consequence: "Klanten die goed geïnformeerd zijn accepteren storingen beter.",
        },
        {
          id: "C",
          label: "Samenwerking intensiveren",
          text: "Werk intensiever samen met andere banken en nationale partijen tijdens aanvallen.",
          quality: "best",
          next: "k5",
          risk: {
            mens: 2,
            proces: 2,
          },
          meters: {
            recovery: 1,
            trust: 1,
          },
          consequence: "Gezamenlijke respons is effectiever dan elke bank voor zich.",
        },
      ],
    },
    {
      id: "k4b",
      title: "Operationele overbelasting",
      tbkTags: [
        "Prioriteiten",
        "Capaciteitsplanning",
      ],
      situation: "Dag 2. Doordat alles tegelijk beschikbaar moest blijven waren systemen continu instabiel. Klanten zijn gefrustreerd.",
      question: "Welke les trek je hieruit?",
      choices: [
        {
          id: "A",
          label: "Vooraf prioriteiten stellen",
          text: "Bepaal van tevoren welke systemen absoluut beschikbaar moeten blijven en welke tijdelijk minder.",
          quality: "best",
          next: "k5",
          risk: {
            proces: 2,
            tech: 1,
          },
          meters: {
            recovery: 2,
          },
          consequence: "Duidelijke keuzes leiden tot stabielere kernfuncties bij de volgende aanval.",
        },
        {
          id: "B",
          label: "Investeren in extra capaciteit",
          text: "Investeer in meer serverruimte en bandbreedte zodat systemen grotere pieken aankunnen.",
          quality: "acceptable",
          next: "k5",
          risk: {
            tech: 2,
            pros: 1,
          },
          meters: {
            operation: -1,
          },
          consequence: "Meer capaciteit helpt maar lost het fundamentele prioriteitsprobleem niet op.",
        },
      ],
    },
    {
      id: "k4c",
      title: "Vertrouwen onder druk",
      tbkTags: [
        "Reputatie",
        "Crisiscommunicatie",
      ],
      situation: "Dag 3. Media en politiek stellen vragen over digitale afhankelijkheid. Klanten geven aan urenlang geen duidelijke uitleg te hebben gekregen.",
      question: "Hoe herstel je het vertrouwen?",
      choices: [
        {
          id: "A",
          label: "Investeren in crisiscommunicatie",
          text: "Ontwikkel betere procedures voor klantcommunicatie tijdens toekomstige incidenten.",
          quality: "best",
          next: "k5",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 2,
            reputation: -1,
          },
          consequence: "Klanten accepteren storingen makkelijker als ze goed geïnformeerd worden.",
        },
        {
          id: "B",
          label: "Technische verbeteringen",
          text: "Focus op technische maatregelen zodat verstoringen minder vaak voorkomen.",
          quality: "acceptable",
          next: "k5",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            recovery: 2,
          },
          consequence: "Minder verstoringen maar als ze toch plaatsvinden mist de organisatie communicatieprotocollen.",
        },
      ],
    },
    {
      id: "k5",
      title: "Evaluatie",
      tbkTags: [
        "Digitale afhankelijkheid",
        "Lessen",
      ],
      situation: "Maand 2. Het evaluatierapport stelt centraal: een organisatie hoeft niet gehackt te worden om volledig ontwricht te raken. Beschikbaarheid is ook een beveiligingsvraagstuk.",
      question: "Ga door naar het definitieve advies.",
      choices: [
        {
          id: "A",
          label: "Conclusies verwerken",
          text: "Je verwerkt de bevindingen en bereidt het definitieve advies voor.",
          quality: "acceptable",
          next: "k6",
          risk: {},
          meters: {},
          consequence: "De board staat klaar voor de laatste bestuursvraag.",
        },
      ],
    },
    {
      id: "k6",
      title: "Definitief advies",
      tbkTags: [
        "Continuïteitsmanagement",
        "Structurele verbetering",
      ],
      situation: "Welke structurele maatregel krijgt prioriteit om toekomstige DDoS-aanvallen beter te kunnen doorstaan?",
      question: "Wat is jouw definitieve aanbeveling?",
      choices: [
        {
          id: "A",
          label: "Prioriteiten voor kritieke betaalsystemen",
          text: "Stel vast welke systemen altijd beschikbaar moeten blijven en beveilig die als eerste.",
          quality: "best",
          next: "end_scenario",
          risk: {
            proces: 2,
            tech: 1,
          },
          meters: {
            recovery: 1,
          },
          consequence: "Duidelijke prioriteiten voorkomen chaos bij de volgende aanval.",
        },
        {
          id: "B",
          label: "Crisiscommunicatie verbeteren",
          text: "Klanten snel en helder informeren beperkt paniek en reputatieschade.",
          quality: "best",
          next: "end_scenario",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 1,
          },
          consequence: "Communicatie is net zo belangrijk als technische maatregelen.",
        },
        {
          id: "C",
          label: "Samenwerking met andere banken",
          text: "Gezamenlijke respons op aanvallen is effectiever dan elke bank voor zich.",
          quality: "best",
          next: "end_scenario",
          risk: {
            mens: 2,
            proces: 2,
          },
          meters: {
            recovery: 1,
            trust: 1,
          },
          consequence: "Sectorbrede samenwerking vergroot de weerbaarheid van het hele betalingssysteem.",
        },
      ],
    },
  ],
}

const vdl = {
  id: "vdl",
  title: "VDL Groep: ransomware in productie",
  year: "2021",
  sector: "Productie / Automotive",
  role: "Operationeel directeur VDL Nedcar",
  cia: [
    "Availability",
  ],
  category: [
    "tech",
    "proces",
  ],
  tbkLens: "Productiecontinuïteit",
  accent: "#ff8c00",
  image: imageManifest.vdl,
  allowCollapse: false,
  sources: [
    "NOS",
    "Omroep Brabant",
    "FD",
  ],
  collapse: {
    title: "Productiecrisis buiten controle",
    text: "BMW schakelt noodleveranciers in. De keten valt volledig stil.",
  },
  intro: [
    "Donderdag 03:47 uur. De nachtdienst belt: systemen vallen een voor een uit. Om 06:00 staan medewerkers bij de poort en BMW verwacht onderdelen.",
    "Dit scenario draait om productiecontinuïteit: als digitale planning, voorraad en kwaliteitsregistratie uitvallen, staat niet alleen IT maar ook de keten stil.",
  ],
  impactStats: [
    {
      value: "15.000",
      label: "medewerkers wereldwijd",
    },
    {
      value: "1 maand",
      label: "volledig herstel",
    },
    {
      value: "BMW",
      label: "klant getroffen",
    },
  ],
  reflection: {
    summary: "VDL toont dat een cyberincident in een productiebedrijf direct een bedrijfscontinuïteitsprobleem wordt. Planning, kwaliteit, klantafspraken en de keten komen tegelijk onder druk.",
    cia: "Focus op Availability: systemen zijn niet beschikbaar waardoor productie en ketenafspraken vastlopen. Integrity speelt mee als handmatige kwaliteitsdata niet meer synchroon loopt.",
    tbk: "TBK-bril: productiecontinuïteit. Welke processen moeten blijven draaien, welke ketenpartners raken afhankelijk?",
    questions: [
      "Welk proces mag in jullie praktijkbedrijf maximaal een dag stilliggen?",
      "Welke klant- of leveranciersafspraak komt direct onder druk als systemen uitvallen?",
      "Zijn back-ups en noodprocedures ooit echt getest?",
    ],
  },
  nodes: [
    {
      id: "k1",
      forkPoint: true,
      title: "De eerste uren",
      tbkTags: [
        "Productiecontinuïteit",
        "Incidentrespons",
        "Kwaliteitsborging",
      ],
      situation: "03:47 uur. Systemen vallen een voor een uit. Je weet nog niet of het een storing of aanval is. Om 06:00 staan medewerkers bij de poort en BMW verwacht onderdelen.",
      question: "Wat is je eerste managementbeslissing?",
      choices: [
        {
          id: "A",
          label: "Direct volledig isoleren",
          text: "Leg alle digitale systemen stil en stuur teams naar crisisprocedure.",
          quality: "best",
          next: "k2a",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            operation: 1,
            recovery: 1,
            trust: 1,
          },
          consequence: "De fabriek valt direct stil. IT meldt dat de besmetting zich niet verder verspreidt.",
          forkLabel: "Pad A: Isolatie",
        },
        {
          id: "B",
          label: "Handmatig doordraaien",
          text: "Laat teams zonder digitale afhankelijkheid op papier verder werken.",
          quality: "acceptable",
          next: "k2b",
          risk: {
            proces: 2,
            mens: 1,
          },
          meters: {
            operation: 2,
            recovery: -1,
            pressure: 1,
          },
          consequence: "Een deel van de productie komt op gang maar kwaliteitsdata en planning lopen niet meer synchroon.",
          forkLabel: "Pad B: Continuïteit",
        },
        {
          id: "C",
          label: "Productielijn testen",
          text: "Start een productielijn opnieuw op om te zien wat nog werkt.",
          quality: "risky",
          next: "k2c",
          risk: {
            tech: 2,
            proces: 2,
          },
          meters: {
            operation: 3,
            chain: 2,
            recovery: -1,
            pressure: 2,
          },
          consequence: "De lijn hapert en valt uit. Daarna melden twee schijnbaar schone systemen dezelfde foutmelding.",
          forkLabel: "Pad C: Test",
        },
      ],
    },
    {
      id: "k2a",
      forkPoint: true,
      title: "Isolatie actief — BMW verwacht onderdelen",
      tbkTags: [
        "Klantcommunicatie",
        "Ketenafhankelijkheid",
      ],
      situation: "06:00 uur. Systemen zijn geïsoleerd. BMW verwacht de eerste levering. IT begint met inventarisatie.",
      question: "Hoe communiceer je naar BMW?",
      choices: [
        {
          id: "A",
          label: "BMW proactief informeren",
          text: "Geef BMW een realistisch tijdvenster: vandaag geen normale levering, update over twee uur.",
          quality: "best",
          next: "k3a",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 1,
            chain: 1,
          },
          consequence: "BMW kan zelf sturen. Je bouwt vertrouwen door eerlijk te zijn over onzekerheid.",
        },
        {
          id: "B",
          label: "IT laten inventariseren voor communicatie",
          text: "Wacht totdat IT de exacte omvang kent voor je naar buiten treedt.",
          quality: "acceptable",
          next: "k3b",
          risk: {
            tech: 2,
            mens: 1,
          },
          meters: {
            operation: 1,
            pressure: 1,
          },
          consequence: "Meer zekerheid maar klanten maken ondertussen eigen aannames.",
        },
      ],
    },
    {
      id: "k2b",
      forkPoint: true,
      title: "Handmatig werken — kwaliteitsproblemen",
      tbkTags: [
        "Kwaliteitsborging",
        "Klantafspraken",
      ],
      situation: "07:00 uur. Teams werken handmatig. Planning, voorraad en kwaliteitsregistratie lopen niet meer synchroon.",
      question: "BMW accepteert veiligheidsonderdelen alleen met controleerbare kwaliteitsdata. Hoe ga je om met deze eis?",
      choices: [
        {
          id: "A",
          label: "Tijdelijke uitzondering bij BMW vragen",
          text: "Vraag BMW formeel om tijdelijke handmatige documentatie te accepteren.",
          quality: "best",
          next: "k3a",
          risk: {
            mens: 2,
            pros: 1,
          },
          meters: {
            trust: 1,
            legal: 1,
          },
          consequence: "BMW waardeert dat je het probleem vroeg benoemt. Het gesprek gaat over beheersing, niet over verzwijgen.",
        },
        {
          id: "B",
          label: "Doorproduceren en later herstellen",
          text: "Maak voorraad en vul digitale registratie later aan.",
          quality: "risky",
          next: "k3c",
          risk: {
            proces: 2,
            tech: 1,
          },
          meters: {
            legal: 2,
            reputation: 2,
            operation: 2,
            recovery: -1,
          },
          consequence: "De hal voelt productief maar eenheden stapelen zich op die nog niet vrijgegeven kunnen worden.",
        },
      ],
    },
    {
      id: "k2c",
      forkPoint: true,
      title: "Testlijn bijt terug",
      tbkTags: [
        "Netwerksegmentatie",
        "Incidentrespons",
      ],
      situation: "04:30 uur. De testlijn heeft twee extra systemen geraakt. IT wil nu alles loskoppelen. De test heeft verspreiding veroorzaakt.",
      question: "Hoe herstel je grip na de risicovolle test?",
      choices: [
        {
          id: "A",
          label: "Noodstop accepteren",
          text: "Stop alsnog alles en geef IT mandaat om fysiek te isoleren.",
          quality: "best",
          next: "k3b",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            recovery: 1,
            operation: 1,
          },
          consequence: "De tweede stilstand voelt pijnlijker. Toch stopt de verspreiding nu wel.",
        },
        {
          id: "B",
          label: "Nog een lijn proberen",
          text: "Test een andere lijn die op een ander segment lijkt te draaien.",
          quality: "risky",
          next: "k3c",
          risk: {
            tech: 2,
            proces: 2,
          },
          meters: {
            operation: 4,
            chain: 2,
            recovery: -2,
            pressure: 2,
          },
          consequence: "IT verliest het overzicht. Niemand weet meer welke systemen schoon zijn.",
        },
      ],
    },
    {
      id: "k3a",
      forkPoint: true,
      title: "BMW-communicatie — crisisteam",
      tbkTags: [
        "Governance",
        "Besluitvorming",
      ],
      situation: "07:20 uur. Productie, IT, communicatie en sales staan bij je bureau. BMW vraagt om een update.",
      question: "Hoe organiseer je de respons?",
      choices: [
        {
          id: "A",
          label: "Crisisteam met mandaat",
          text: "Maak een klein crisisteam: IT isoleert, operations prioriteert, communicatie stemt af.",
          quality: "best",
          next: "k4a",
          risk: {
            mens: 2,
            proces: 2,
          },
          meters: {
            recovery: 1,
            trust: 1,
            pressure: -1,
          },
          consequence: "De chaos wordt geordend. Mensen weten wie beslist en wanneer informatie terugkomt.",
        },
        {
          id: "B",
          label: "Iedereen eigen spoor",
          text: "Laat elk team doen wat nodig is en verzamel later de status.",
          quality: "risky",
          next: "k4b",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            operation: 2,
            pressure: 2,
            reputation: 1,
          },
          consequence: "Teams werken langs elkaar heen. Sales belooft klanten meer dan IT kan waarmaken.",
        },
      ],
    },
    {
      id: "k3b",
      forkPoint: true,
      title: "IT inventariseert — omvang duidelijker",
      tbkTags: [
        "Forensisch onderzoek",
        "Herstelvermogen",
      ],
      situation: "08:00 uur. De omvang van de aanval wordt duidelijker. Een externe securitypartij adviseert om bewijs veilig te stellen voor herstel.",
      question: "Bewijs of snelheid?",
      choices: [
        {
          id: "A",
          label: "Forensisch bewijs veiligstellen",
          text: "Stel logs en schijfbeelden veilig voor herstel begint.",
          quality: "best",
          next: "k4a",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            recovery: 1,
            legal: -1,
          },
          consequence: "Bewijs is veilig voor eventueel onderzoek en verzekeringsaanspraken.",
        },
        {
          id: "B",
          label: "Direct herstellen",
          text: "Begin zo snel mogelijk met herstel zonder te wachten op forensics.",
          quality: "acceptable",
          next: "k4b",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            operation: 1,
            legal: 1,
            recovery: 1,
          },
          consequence: "Herstel gaat sneller maar forensisch bewijs gaat verloren. Verzekeraar kan vragen stellen.",
        },
      ],
    },
    {
      id: "k3c",
      forkPoint: true,
      title: "Kwaliteit en juridische druk",
      tbkTags: [
        "Kwaliteitsborging",
        "Aansprakelijkheid",
      ],
      situation: "Middag. Eenheden zijn geproduceerd maar niet vrijgegeven. BMW vraagt om certificaten. Juridisch advies: aansprakelijkheidsrisico als kwaliteitsdata niet klopt.",
      question: "Hoe los je het kwaliteitsprobleem op?",
      choices: [
        {
          id: "A",
          label: "Productie stoppen en BMW informeren",
          text: "Stop handmatige productie en informeer BMW transparant over het kwaliteitsprobleem.",
          quality: "best",
          next: "k4a",
          risk: {
            mens: 2,
            proces: 2,
          },
          meters: {
            trust: 1,
            legal: -1,
            operation: 1,
          },
          consequence: "Reputatieschade is er maar aansprakelijkheidsrisico is beperkt. BMW waardeert transparantie.",
        },
        {
          id: "B",
          label: "Afwachten totdat BMW belt",
          text: "Wacht op druk van BMW voordat je de kwaliteitskwestie bespreekt.",
          quality: "risky",
          next: "k4c",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            legal: 3,
            reputation: 3,
            chain: 2,
            pressure: 2,
          },
          consequence: "BMW ontdekt het kwaliteitsrisico zelf. Vertrouwen en aansprakelijkheid nemen explosief toe.",
        },
      ],
    },
    {
      id: "k4a",
      title: "Herstel gecoördineerd",
      tbkTags: [
        "Herstelvermogen",
        "Continuïteitsplanning",
      ],
      situation: "Dag 2. Het crisisteam coördineert herstel. De aanval is beheersbaar gebleven door vroege isolatie.",
      question: "Welke structurele verbetering heeft prioriteit?",
      choices: [
        {
          id: "A",
          label: "Netwerksegmentatie verbeteren",
          text: "Scheid productie-IT beter van kantoor-IT zodat een aanval zich minder makkelijk verspreidt.",
          quality: "best",
          next: "k5",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            recovery: 2,
          },
          consequence: "Structureel minder kwetsbaar voor verspreiding bij een volgende aanval.",
        },
        {
          id: "B",
          label: "Back-ups en herstelplan testen",
          text: "Test regelmatig of back-ups werken en herstelplannen realistisch zijn.",
          quality: "best",
          next: "k5",
          risk: {
            tech: 2,
            proces: 2,
          },
          meters: {
            recovery: 2,
          },
          consequence: "Een ongetest herstelplan is geen herstelplan. Regelmatige tests zijn onmisbaar.",
        },
        {
          id: "C",
          label: "Noodprocedures voor handmatige productie",
          text: "Maak en oefen noodprocedures voor handmatige productie inclusief kwaliteitsregistratie.",
          quality: "acceptable",
          next: "k5",
          risk: {
            proces: 2,
            mens: 1,
          },
          meters: {
            recovery: 1,
          },
          consequence: "Handmatig werken moet van tevoren zijn doorgedacht om fouten te voorkomen.",
        },
      ],
    },
    {
      id: "k4b",
      title: "Teams werken langs elkaar heen",
      tbkTags: [
        "Governance",
        "Crisiscoördinatie",
      ],
      situation: "Dag 2. Verschillende teams hebben eigen beslissingen genomen. Tegenstrijdige informatie bereikt BMW.",
      question: "Hoe herstel je regie?",
      choices: [
        {
          id: "A",
          label: "Crisisstructuur alsnog opzetten",
          text: "Stel alsnog een crisisteam in met duidelijke rolverdeling en communicatielijn.",
          quality: "best",
          next: "k5",
          risk: {
            mens: 2,
            proces: 2,
          },
          meters: {
            recovery: 1,
            trust: 1,
          },
          consequence: "Late maar effectieve ingreep. Verdere tegenstrijdige communicatie stopt.",
        },
        {
          id: "B",
          label: "Teams los laten werken",
          text: "Geef teams autonomie om problemen zelf op te lossen.",
          quality: "risky",
          next: "k5",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            operation: 2,
            pressure: 2,
            reputation: 1,
          },
          consequence: "Snelheid per team maar geen coherente aanpak naar klanten en keten.",
        },
      ],
    },
    {
      id: "k4c",
      title: "Juridische en reputatiedruk",
      tbkTags: [
        "Aansprakelijkheid",
        "Klantrelaties",
      ],
      situation: "Dag 3. BMW heeft juridisch advies ingewonnen. Media berichten over de productiestilstand en kwaliteitsrisico's.",
      question: "Hoe reageer je op de druk?",
      choices: [
        {
          id: "A",
          label: "Volledige transparantie naar BMW",
          text: "Informeer BMW volledig over wat er is gebeurd en welke maatregelen zijn genomen.",
          quality: "best",
          next: "k5",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 1,
            legal: -1,
            reputation: -1,
          },
          consequence: "Openheid is pijnlijk op korte termijn maar de beste basis voor een lange relatie.",
        },
        {
          id: "B",
          label: "Minimale disclosure",
          text: "Beperk informatie tot wat contractueel verplicht is.",
          quality: "risky",
          next: "k5",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            legal: 3,
            reputation: 3,
            chain: 1,
          },
          consequence: "BMW ontdekt meer dan je deelt. Het vertrouwen is structureel beschadigd.",
        },
      ],
    },
    {
      id: "k5",
      title: "Evaluatie",
      tbkTags: [
        "Productiecontinuïteit",
        "Digitale afhankelijkheid",
      ],
      situation: "Maand 2. Evaluatie toont: moderne productiebedrijven kunnen volledig stilvallen zonder dat machines fysiek kapot zijn. Digitale systemen zijn de kern van productiecontinuïteit.",
      question: "Ga door naar het definitieve advies.",
      choices: [
        {
          id: "A",
          label: "Conclusies verwerken",
          text: "Je verwerkt de bevindingen en bereidt het definitieve advies voor.",
          quality: "acceptable",
          next: "k6",
          risk: {},
          meters: {},
          consequence: "De board staat klaar voor de laatste bestuursvraag.",
        },
      ],
    },
    {
      id: "k6",
      title: "Definitief advies",
      tbkTags: [
        "Cyber resilience",
        "Productiecontinuïteit",
      ],
      situation: "De board stelt de definitieve vraag: welke maatregel krijgt prioriteit om productiestilstand bij een volgende aanval te voorkomen?",
      question: "Wat is jouw definitieve aanbeveling?",
      choices: [
        {
          id: "A",
          label: "Offline back-ups en herstelplan testen",
          text: "Zorg voor geteste offline back-ups en realistische herstelplannen.",
          quality: "best",
          next: "end_scenario",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            recovery: 2,
          },
          consequence: "Een ongetest herstelplan beschermt je niet. Testen maakt het verschil.",
        },
        {
          id: "B",
          label: "Netwerksegmentatie",
          text: "Scheid productie-IT van kantoor-IT zodat aanvallen minder snel verspreiden.",
          quality: "best",
          next: "end_scenario",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            recovery: 1,
          },
          consequence: "Structureel minder kwetsbaar voor brede verspreiding.",
        },
        {
          id: "C",
          label: "Noodprocedures voor handmatige productie",
          text: "Maak en oefen procedures zodat productie tijdelijk handmatig kan doorgaan.",
          quality: "acceptable",
          next: "end_scenario",
          risk: {
            proces: 2,
            mens: 1,
          },
          meters: {
            trust: 1,
          },
          consequence: "Handmatig werken moet van tevoren zijn doorgedacht om kwaliteitsfouten te voorkomen.",
        },
      ],
    },
  ],
}

const chipsoft = {
  id: "chipsoft",
  title: "ChipSoft: ransomware in de zorgketen",
  year: "2022",
  sector: "Zorg-IT",
  role: "Operations manager ChipSoft",
  cia: [
    "Availability",
  ],
  category: [
    "tech",
    "proces",
  ],
  tbkLens: "Kritieke leveranciersafhankelijkheid",
  accent: "#059669",
  image: imageManifest.chipsoft,
  allowCollapse: false,
  sources: [
    "NOS",
    "Zorgvisie",
    "IGJ",
  ],
  collapse: {
    title: "Zorgsystemen volledig uitgevallen",
    text: "Operaties worden uitgesteld. IGJ start een onderzoek naar patiëntveiligheid.",
  },
  intro: [
    "Woensdag 14 september 2022 — 07:18 uur. Als operations manager bij ChipSoft komen meldingen binnen van ziekenhuizen: patiëntgegevens laden traag, systemen reageren niet, afspraken verdwijnen uit planningen.",
    "Eén storing bij een softwareleverancier raakt tientallen zorginstellingen tegelijk. Dit scenario laat zien hoe afhankelijk kritieke sectoren zijn van softwareleveranciers.",
  ],
  impactStats: [
    {
      value: "50+",
      label: "ziekenhuizen geraakt",
    },
    {
      value: "Ransomware",
      label: "aanvaltype",
    },
    {
      value: "patiëntveiligheid",
      label: "direct in gevaar",
    },
  ],
  reflection: {
    summary: "ChipSoft toont dat wanneer kritieke softwaresystemen uitvallen, dit direct de operatie van andere organisaties raakt. Een softwareleverancier in de zorg is onderdeel van de zorg zelf.",
    cia: "Focus op Availability: ziekenhuizen kunnen patiëntprocessen niet meer normaal uitvoeren. Integrity speelt mee als handmatige data niet meer betrouwbaar is.",
    tbk: "TBK-bril: leveranciersafhankelijkheid. Hoe kwetsbaar is een organisatie als een kritieke leverancier uitvalt?",
    questions: [
      "Welke systemen zijn cruciaal voor de dagelijkse operatie van jullie praktijkbedrijf?",
      "Wat gebeurt er als die systemen tijdelijk wegvallen?",
      "Van welke externe leveranciers is jullie organisatie afhankelijk?",
    ],
  },
  nodes: [
    {
      id: "k1",
      forkPoint: true,
      title: "Eerste reactie — systemen uitgevallen",
      tbkTags: [
        "Kritieke infrastructuur",
        "Incidentrespons",
        "Patiëntveiligheid",
      ],
      situation: "07:42 uur. Meerdere systemen zijn geraakt: patiëntportalen, planningssystemen, interne servers en koppelingen met ziekenhuizen. Artsen schrijven patiëntinformatie handmatig op.",
      question: "Wat is je eerste beslissing?",
      choices: [
        {
          id: "A",
          label: "Netwerk gedeeltelijk afsluiten",
          text: "Sluit delen van het netwerk tijdelijk af om verdere verspreiding te voorkomen.",
          quality: "best",
          next: "k2a",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            recovery: 2,
            operation: 2,
          },
          consequence: "Ziekenhuizen raken tijdelijk extra functionaliteiten kwijt maar verdere verspreiding stopt.",
          forkLabel: "Pad A: Isolatie",
        },
        {
          id: "B",
          label: "Systemen actief houden",
          text: "Houd systemen zoveel mogelijk actief zodat ziekenhuizen kunnen blijven werken.",
          quality: "risky",
          next: "k2b",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            operation: 1,
            chain: 1,
          },
          consequence: "Ziekenhuizen blijven operationeel maar het risico op verdere verspreiding groeit.",
          forkLabel: "Pad B: Continuïteit",
        },
        {
          id: "C",
          label: "Back-ups beschermen",
          text: "Focus eerst op het beschermen van back-ups en kritieke zorgdata.",
          quality: "acceptable",
          next: "k2c",
          risk: {
            tech: 2,
            pros: 1,
          },
          meters: {
            recovery: 2,
          },
          consequence: "Je voorkomt dat herstel onmogelijk wordt maar de aanval verspreidt zich ondertussen.",
          forkLabel: "Pad C: Back-up",
        },
      ],
    },
    {
      id: "k2a",
      forkPoint: true,
      title: "Netwerk afgesloten — ziekenhuizen melden problemen",
      tbkTags: [
        "Operationele continuïteit",
        "Zorgketen",
      ],
      situation: "08:10 uur. Koppelingen zijn afgesloten. Ziekenhuizen melden langere wachttijden en handmatige administratie. Elke minuut vertraging raakt direct de zorg.",
      question: "Hoe lang houd je de afsluiting actief?",
      choices: [
        {
          id: "A",
          label: "Afsluiting handhaven",
          text: "Houd de afsluiting actief totdat systemen volledig zijn gecontroleerd.",
          quality: "risky",
          next: "k3a",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            recovery: 2,
            operation: 2,
            chain: 1,
          },
          consequence: "Maximale zekerheid maar de operationele druk op ziekenhuizen neemt snel toe.",
        },
        {
          id: "B",
          label: "Kritieke verbindingen herstellen",
          text: "Herstel verbindingen voor de meest urgente zorgprocessen na basiscontrole.",
          quality: "acceptable",
          next: "k3b",
          risk: {
            tech: 1,
            proces: 1,
          },
          meters: {
            chain: 1,
            operation: 1,
          },
          consequence: "Deels herstel van zorgcapaciteit maar resterende risicos bestaan nog.",
        },
      ],
    },
    {
      id: "k2b",
      forkPoint: true,
      title: "Systemen actief — verspreiding groeit",
      tbkTags: [
        "Risicoafweging",
        "Zorgketen",
      ],
      situation: "08:24 uur. ChipSoft houdt systemen actief maar security meldt: we weten nog niet welke onderdelen veilig zijn. Ziekenhuis: als dit verder uitvalt moeten operaties worden uitgesteld.",
      question: "De balans tussen beschikbaarheid en veiligheid.",
      choices: [
        {
          id: "A",
          label: "Beperken tot kritieke processen",
          text: "Beperk functionaliteiten tot alleen systemen die direct patiëntenzorg ondersteunen.",
          quality: "best",
          next: "k3b",
          risk: {
            tech: 1,
            proces: 2,
          },
          meters: {
            recovery: 1,
            operation: -1,
          },
          consequence: "Minder beschikbaar maar wat beschikbaar is werkt betrouwbaar.",
        },
        {
          id: "B",
          label: "Alles actief houden",
          text: "Houd alle functionaliteiten actief zolang systemen reageren.",
          quality: "risky",
          next: "k3c",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            operation: 2,
            chain: 2,
            pressure: 2,
          },
          consequence: "Systemen blijven bereikbaar maar de kans op brede uitval groeit snel.",
        },
      ],
    },
    {
      id: "k2c",
      forkPoint: true,
      title: "Back-ups beschermen — probleem ontdekt",
      tbkTags: [
        "Data-integriteit",
        "Herstelvermogen",
      ],
      situation: "08:37 uur. IT ontdekt dat sommige back-ups mogelijk ook zijn geraakt. Als herstelbestanden besmet zijn kan dit dagen duren.",
      question: "Hoe reageer je op dit nieuwe risico?",
      choices: [
        {
          id: "A",
          label: "Focus op herstel van kritieke koppelingen",
          text: "Herstel als eerste de koppelingen die direct patiëntenzorg ondersteunen.",
          quality: "best",
          next: "k3a",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            recovery: 2,
            operation: 1,
          },
          consequence: "Prioriteit bij de meest kritieke zorgfuncties. Minder urgente koppelingen wachten.",
        },
        {
          id: "B",
          label: "Open communiceren naar ziekenhuizen",
          text: "Informeer ziekenhuizen direct open over de situatie ook als nog niet alles bevestigd is.",
          quality: "best",
          next: "k3b",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 2,
            reputation: -1,
          },
          consequence: "Ziekenhuizen kunnen eigen noodprocedures activeren. Transparantie vergroot vertrouwen.",
        },
      ],
    },
    {
      id: "k3a",
      forkPoint: true,
      title: "Zorgketen onder druk",
      tbkTags: [
        "Patiëntveiligheid",
        "Crisiscoördinatie",
      ],
      situation: "10:12 uur. De verstoring is groter dan gedacht. Spoedafdelingen schakelen terug op papieren processen. NOS: Cyberproblemen verstoren digitale zorgsystemen.",
      question: "Hoe prioriteer je de beschikbare capaciteit?",
      choices: [
        {
          id: "A",
          label: "Patiëntenzorg-systemen first",
          text: "Geef prioriteit aan systemen die direct patiëntenzorg ondersteunen.",
          quality: "best",
          next: "k4a",
          risk: {
            mens: 2,
            proces: 2,
          },
          meters: {
            recovery: 2,
            operation: -1,
          },
          consequence: "Kritieke zorgfuncties worden als eerste hersteld. Andere functies wachten.",
        },
        {
          id: "B",
          label: "Alles tegelijk herstellen",
          text: "Probeer alle systemen tegelijk te herstellen om snel volledig operationeel te zijn.",
          quality: "risky",
          next: "k4b",
          risk: {
            tech: 2,
            proces: 1,
          },
          meters: {
            operation: 2,
            pressure: 1,
          },
          consequence: "Breed inzetbaar maar herstel gaat traag en niets werkt optimaal.",
        },
      ],
    },
    {
      id: "k3b",
      forkPoint: true,
      title: "Noodprocessen actief",
      tbkTags: [
        "Zorgketen",
        "Communicatie",
      ],
      situation: "11:05 uur. Ziekenhuizen werken met noodprocedures. Druk op medewerkers stijgt snel. Een grote zorginstelling vraagt: kunnen jullie garanderen dat systemen vandaag stabiel blijven?",
      question: "Hoe communiceer je over de situatie?",
      choices: [
        {
          id: "A",
          label: "Open communiceren over risicos",
          text: "Communiceer direct open over wat er is en wanneer herstel verwacht wordt.",
          quality: "best",
          next: "k4a",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 2,
            reputation: -1,
          },
          consequence: "Ziekenhuizen kunnen plannen. Transparantie is cruciaal voor vertrouwen in een zorgomgeving.",
        },
        {
          id: "B",
          label: "Wachten op meer informatie",
          text: "Wacht met communicatie totdat meer duidelijk is over de omvang.",
          quality: "acceptable",
          next: "k4c",
          risk: {
            mens: 1,
            proces: 2,
          },
          meters: {
            trust: -1,
            operation: 1,
          },
          consequence: "Meer zekerheid maar ziekenhuizen blijven onnodig lang in onzekerheid.",
        },
      ],
    },
    {
      id: "k3c",
      forkPoint: true,
      title: "Escalatie",
      tbkTags: [
        "Crisisescalatie",
        "IGJ",
      ],
      situation: "12:18 uur. Systemen hebben zich verder verspreid. Meerdere ziekenhuizen stellen operaties uit. De Inspectie Gezondheidszorg vraagt updates over patiëntveiligheid.",
      question: "Hoe ga je om met de escalerende situatie?",
      choices: [
        {
          id: "A",
          label: "Samenwerken met ziekenhuizen",
          text: "Werk actief samen met ziekenhuizen om prioriteiten opnieuw te bepalen.",
          quality: "best",
          next: "k4a",
          risk: {
            mens: 2,
            proces: 2,
          },
          meters: {
            trust: 1,
            operation: -1,
          },
          consequence: "Gezamenlijke aanpak beperkt de impact op patiënten en vergroot het vertrouwen.",
        },
        {
          id: "B",
          label: "Intern technisch herstel",
          text: "Focus eerst volledig op intern technisch herstel.",
          quality: "risky",
          next: "k4c",
          risk: {
            tech: 2,
            pros: 1,
          },
          meters: {
            operation: 2,
            chain: 1,
            pressure: 2,
          },
          consequence: "Technisch herstel krijgt alle aandacht maar ziekenhuizen voelen zich in de steek gelaten.",
        },
      ],
    },
    {
      id: "k4a",
      title: "Crisisoverleg — herstel gecoördineerd",
      tbkTags: [
        "Structurele verbetering",
        "Zorgsamenwerking",
      ],
      situation: "Dag 2. De verstoring neemt af. De organisatie bespreekt hoe herhaling wordt voorkomen.",
      question: "Welke structurele verbetering heeft prioriteit?",
      choices: [
        {
          id: "A",
          label: "Zorgsystemen beter scheiden",
          text: "Scheid kritieke zorgsystemen beter van andere IT-omgevingen.",
          quality: "best",
          next: "k5",
          risk: {
            tech: 2,
            pros: 1,
          },
          meters: {
            recovery: 2,
          },
          consequence: "Structurele isolatie vermindert de kans dat een aanval zich zo breed verspreidt.",
        },
        {
          id: "B",
          label: "Noodprocedures ontwikkelen",
          text: "Ontwikkel betere noodprocedures zodat zorgprocessen tijdelijk handmatig kunnen doorgaan.",
          quality: "best",
          next: "k5",
          risk: {
            mens: 2,
            proces: 2,
          },
          meters: {
            operation: -1,
            recovery: 1,
          },
          consequence: "Ziekenhuizen kunnen ook zonder systemen doorwerken als ze weten hoe.",
        },
        {
          id: "C",
          label: "Samenwerking intensiveren",
          text: "Werk intensiever samen met ziekenhuizen tijdens cyberincidenten.",
          quality: "best",
          next: "k5",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 2,
          },
          consequence: "Betere samenwerking beperkt impact op patiënten tijdens toekomstige incidenten.",
        },
      ],
    },
    {
      id: "k4b",
      title: "Overbelasting van herstelteams",
      tbkTags: [
        "Prioriteiten",
        "Herstelbeheer",
      ],
      situation: "Dag 2. Herstelteams proberen alles tegelijk te repareren. Afdelingen werken langs elkaar heen.",
      question: "Hoe herstel je regie over het herstelproces?",
      choices: [
        {
          id: "A",
          label: "Duidelijke prioriteiten stellen",
          text: "Bepaal welke systemen als eerste worden hersteld en communiceer dit helder.",
          quality: "best",
          next: "k5",
          risk: {
            mens: 2,
            proces: 2,
          },
          meters: {
            recovery: 2,
            operation: 1,
          },
          consequence: "Herstel gaat geordend. Kritieke zorgfuncties komen als eerste terug.",
        },
        {
          id: "B",
          label: "Extra technische capaciteit",
          text: "Schakel meer externe IT-partners in voor parallel herstel.",
          quality: "acceptable",
          next: "k5",
          risk: {
            tech: 2,
            pros: 1,
          },
          meters: {
            operation: -1,
            recovery: 1,
          },
          consequence: "Meer capaciteit maar coördinatie wordt complexer.",
        },
      ],
    },
    {
      id: "k4c",
      title: "Vertrouwen onder druk",
      tbkTags: [
        "Reputatie",
        "Zorgrelaties",
      ],
      situation: "Dag 3. Ziekenhuizen en IGJ stellen vragen over patiëntveiligheid. Meerdere zorginstellingen overwegen alternatieve leveranciers.",
      question: "Hoe herstel je het vertrouwen?",
      choices: [
        {
          id: "A",
          label: "Crisiscommunicatie verbeteren",
          text: "Stel betere procedures in voor communicatie met ziekenhuizen tijdens incidenten.",
          quality: "best",
          next: "k5",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 2,
            reputation: -1,
          },
          consequence: "Ziekenhuizen voelen zich gehoord. Toekomstige incidenten worden minder snel gevolgd door vertrouwenscrises.",
        },
        {
          id: "B",
          label: "Technisch herstelplan",
          text: "Focus op aantoonbaar betere technische beveiliging en herstelcapaciteit.",
          quality: "acceptable",
          next: "k5",
          risk: {
            tech: 2,
            pros: 1,
          },
          meters: {
            recovery: 2,
          },
          consequence: "Technisch sterk maar zonder betere communicatie blijft het vertrouwen kwetsbaar.",
        },
      ],
    },
    {
      id: "k5",
      title: "Evaluatie",
      tbkTags: [
        "Leveranciersafhankelijkheid",
        "Lessen",
      ],
      situation: "Maand 2. Kernles: wanneer kritieke softwaresystemen uitvallen raakt dat direct de operatie van andere organisaties. Een softwareleverancier in de zorg is onderdeel van de zorg zelf.",
      question: "Ga door naar het definitieve advies.",
      choices: [
        {
          id: "A",
          label: "Conclusies verwerken",
          text: "Je verwerkt de bevindingen en bereidt het definitieve advies voor.",
          quality: "acceptable",
          next: "k6",
          risk: {},
          meters: {},
          consequence: "De board staat klaar voor de laatste bestuursvraag.",
        },
      ],
    },
    {
      id: "k6",
      title: "Definitief advies",
      tbkTags: [
        "Cyber resilience",
        "Zorgketen",
      ],
      situation: "Welke structurele maatregel krijgt prioriteit om herhaling te voorkomen?",
      question: "Wat is jouw definitieve aanbeveling?",
      choices: [
        {
          id: "A",
          label: "Zorgsystemen scheiden",
          text: "Scheid kritieke zorgsystemen van andere IT-omgevingen zodat aanvallen minder snel verspreiden.",
          quality: "best",
          next: "end_scenario",
          risk: {
            tech: 2,
            pros: 1,
          },
          meters: {
            recovery: 1,
          },
          consequence: "Structurele isolatie is de effectiefste technische maatregel.",
        },
        {
          id: "B",
          label: "Noodprocedures voor handmatige zorg",
          text: "Ziekenhuizen moeten tijdelijk zonder digitale systemen kunnen doorwerken.",
          quality: "best",
          next: "end_scenario",
          risk: {
            mens: 2,
            proces: 2,
          },
          meters: {
            operation: -1,
          },
          consequence: "Handmatige procedures moeten van tevoren zijn doorgedacht en geoefend.",
        },
        {
          id: "C",
          label: "Betere samenwerking en communicatie",
          text: "Verbeter samenwerking en communicatie met zorginstellingen tijdens cyberincidenten.",
          quality: "best",
          next: "end_scenario",
          risk: {
            mens: 2,
            proces: 1,
          },
          meters: {
            trust: 1,
          },
          consequence: "Communicatie is net zo belangrijk als technische maatregelen.",
        },
      ],
    },
  ],
}

const maersk = {
  id: "maersk",
  title: "Maersk / NotPetya: wereldwijde logistiek plat",
  year: "2017",
  sector: "Logistiek / Wereldhandel",
  role: "Operations manager APM Terminals Rotterdam",
  cia: [
    "Availability",
  ],
  category: [
    "tech",
    "proces",
  ],
  tbkLens: "Supply chain en herstelvermogen",
  accent: "#1d4ed8",
  image: imageManifest.maersk,
  allowCollapse: false,
  sources: [
    "Wired",
    "FT",
    "Maersk Annual Report 2017",
  ],
  collapse: {
    title: "Supply chain volledig stilgelegd",
    text: "Schepen liggen stil. Geen enkele terminal weet waar containers staan.",
  },
  intro: [
    "Dinsdag 27 juni 2017 — 13:15 uur. Als operations manager bij APM Terminals Rotterdam vallen de eerste schermen uit. Containernummers verdwijnen, vrachtwagens krijgen geen instructies, boekingen laden niet meer.",
    "Dit is NotPetya: niet alleen Rotterdam maar tientallen Maersk-locaties wereldwijd zijn geraakt. De vraag is hoe je de fysieke goederenstroom overeind houdt als de digitale kaart van de wereld wegvalt.",
  ],
  impactStats: [
    {
      value: "$300M",
      label: "schade",
    },
    {
      value: "45.000",
      label: "computers geraakt",
    },
    {
      value: "130 landen",
      label: "getroffen",
    },
  ],
  reflection: {
    summary: "Maersk toont dat digitale systemen niet alleen ondersteunend zijn voor logistiek maar dat ze de ruggengraat vormen van de fysieke goederenstroom zelf.",
    cia: "Focus op Availability: zonder digitale systemen weet niemand meer welke container waar staat, welke lading prioriteit heeft of welk schip wanneer vertrekt.",
    tbk: "TBK-bril: supply chain en herstelvermogen. Wat doe je als je planningssysteem uitvalt en de fysieke operatie toch door moet?",
    questions: [
      "Welke processen in jullie praktijkbedrijf zijn afhankelijk van digitale planning?",
      "Wat gebeurt er als niemand meer weet waar producten of orders zijn?",
      "Welke leveranciers of software-updates kunnen risico vormen?",
    ],
  },
  nodes: [
    {
      id: "k1",
      forkPoint: true,
      title: "Eerste reactie in de terminal",
      tbkTags: [
        "Supply chain",
        "Crisismanagement",
        "Continuiteit",
      ],
      situation: "13:35 uur. De terminal is fysiek intact: kranen werken, vrachtwagens rijden, containers staan er nog. Maar niemand weet welke container waar staat, welke prioriteit heeft of welke lading gevaarlijk is.",
      question: "Hoe reageer je op de digitale chaos?",
      choices: [
        {
          id: "A",
          label: "Terminal tijdelijk sluiten",
          text: "Sluit de terminal voor nieuwe vrachtwagens en schepen totdat containergegevens zijn gecontroleerd.",
          quality: "acceptable",
          next: "k2a",
          risk: {
            proces: 2,
            tech: 1,
          },
          meters: {
            recovery: 2,
            chain: 2,
          },
          consequence: "De wachtrij groeit direct maar je voorkomt dat de chaos groter wordt.",
          forkLabel: "Pad A: Sluiting",
        },
        {
          id: "B",
          label: "Handmatig doorgaan",
          text: "Laat de terminal beperkt doordraaien met papieren lijsten, portofoons en manifesten.",
          quality: "acceptable",
          next: "k2b",
          risk: {
            mens: 2,
            proces: 2,
          },
          meters: {
            pressure: 1,
            chain: 1,
          },
          consequence: "Fysieke operatie gaat gedeeltelijk door maar problemen met dubbele opdrachten en fouten stapelen zich op.",
          forkLabel: "Pad B: Handmatig",
        },
        {
          id: "C",
          label: "Kritieke lading first",
          text: "Geef prioriteit aan containers met medische, bederfelijke of contractueel kritieke lading.",
          quality: "best",
          next: "k2c",
          risk: {
            mens: 2,
            pros: 1,
          },
          meters: {
            recovery: 1,
            trust: 1,
          },
          consequence: "Je accepteert dat niet alles door kan maar beperkt de grootste maatschappelijke schade.",
          forkLabel: "Pad C: Prioriteit",
        },
      ],
    },
    {
      id: "k2a",
      forkPoint: true,
      title: "Terminal gesloten — wachtrijen groeien",
      tbkTags: [
        "Operationele continuiteit",
        "Klantcommunicatie",
      ],
      situation: "14:20 uur. Binnen een uur staat een lange rij vrachtwagens bij de poort. Schepen wachten. Klanten willen weten waar hun containers zijn.",
      question: "Hoe lang houd je de terminal gesloten?",
      choices: [
        {
          id: "A",
          label: "Gesloten totdat alles gecontroleerd is",
          text: "Maximale zekerheid: wacht totdat alle containerlocaties handmatig zijn bevestigd.",
          quality: "risky",
          next: "k3a",
          risk: {
            pros: 2,
            tech: 1,
          },
          meters: {
            recovery: 2,
            chain: 2,
          },
          consequence: "Maximale zekerheid maar duizenden bewegingen worden vertraagd. Keten komt ernstig onder druk.",
        },
        {
          id: "B",
          label: "Gecontroleerde stroom openen",
          text: "Open één handmatige stroom voor de meest kritieke containers.",
          quality: "best",
          next: "k3b",
          risk: {
            mens: 2,
            pros: 2,
          },
          meters: {
            recovery: 1,
            trust: 1,
          },
          consequence: "Je combineert zekerheid en doorstroom. Kritieke lading kan door terwijl de rest wacht.",
        },
      ],
    },
    {
      id: "k2b",
      forkPoint: true,
      title: "Handmatig werken — chaos groeit",
      tbkTags: [
        "Informatiebeheer",
        "Ketencoördinatie",
      ],
      situation: "14:35 uur. Teams werken met papieren lijsten en portofoons maar al snel: dubbele opdrachten, containers op verkeerde rijen, klanten met verschillende versies van dezelfde planning.",
      question: "Hoe beheers je de handmatige chaos?",
      choices: [
        {
          id: "A",
          label: "Handmatig werk beperken tot kritieke lading",
          text: "Beperk handmatig werk tot vooraf bepaalde kritieke containers.",
          quality: "best",
          next: "k3b",
          risk: {
            mens: 2,
            pros: 2,
          },
          meters: {
            recovery: 1,
            chain: -1,
          },
          consequence: "Meer overzicht. Minder volume maar betrouwbaardere informatie per beweging.",
        },
        {
          id: "B",
          label: "Teams zelf laten improviseren",
          text: "Laat elk team eigen handmatige oplossingen gebruiken om zoveel mogelijk volume te verwerken.",
          quality: "risky",
          next: "k3c",
          risk: {
            mens: 1,
            pros: 2,
          },
          meters: {
            chain: 1,
            pressure: 2,
            operation: 2,
          },
          consequence: "Volume gaat omhoog maar de kwaliteit van de data keldert. Verwarring verspreidt zich naar de keten.",
        },
      ],
    },
    {
      id: "k2c",
      forkPoint: true,
      title: "Kritieke lading — keuzes maken",
      tbkTags: [
        "Prioriteitstelling",
        "Klantrelaties",
      ],
      situation: "14:50 uur. Je team maakt een prioriteitenlijst: medische producten, bederfelijke goederen, gevaarlijke stoffen, onderdelen voor stilvallende productielijnen. Niet iedereen is tevreden.",
      question: "Hoe houd je vast aan de prioriteiten?",
      choices: [
        {
          id: "A",
          label: "Prioriteitenlijst handhaven",
          text: "Houd vast aan de lijst en leg actief uit waarom aan klanten die klagen.",
          quality: "best",
          next: "k3b",
          risk: {
            mens: 2,
            pros: 2,
          },
          meters: {
            trust: 2,
            recovery: 1,
          },
          consequence: "Klanten accepteren de keuze beter als ze de redenering begrijpen. Vertrouwen blijft intact.",
        },
        {
          id: "B",
          label: "Prioriteiten aanpassen op druk",
          text: "Pas de lijst aan op basis van druk van grote klanten.",
          quality: "acceptable",
          next: "k3c",
          risk: {
            mens: 1,
            pros: 2,
          },
          meters: {
            trust: 1,
            chain: 1,
          },
          consequence: "Korte-termijn klanttevredenheid maar de objectieve prioritering verdwijnt.",
        },
      ],
    },
    {
      id: "k3a",
      forkPoint: true,
      title: "Wereldwijde uitval bevestigd",
      tbkTags: [
        "Globale impact",
        "Crisiscommunicatie",
      ],
      situation: "17:30 uur. Kopenhagen bevestigt: niet één terminal maar tientallen Maersk-locaties wereldwijd. Duizenden computers onbruikbaar. Schepen vertraagd door ontbrekende documentatie.",
      question: "Hoe communiceer je over de wereldwijde impact?",
      choices: [
        {
          id: "A",
          label: "Direct wereldwijd communiceren",
          text: "Communiceer direct naar klanten dat de verstoring groot is en dat processen handmatig doorgaan waar mogelijk.",
          quality: "best",
          next: "k4a",
          risk: {
            mens: 2,
            pros: 1,
          },
          meters: {
            trust: 2,
            pressure: 1,
          },
          consequence: "Klanten kunnen zelf plannen. De organisatie behoudt regie over het narratief.",
        },
        {
          id: "B",
          label: "Beperkt communiceren",
          text: "Wacht met communicatie totdat het hoofdkantoor exacte informatie heeft.",
          quality: "risky",
          next: "k4c",
          risk: {
            mens: 1,
            pros: 2,
          },
          meters: {
            trust: -1,
            chain: 1,
            pressure: 2,
          },
          consequence: "Klanten horen de omvang via media. Vertrouwen daalt snel.",
        },
      ],
    },
    {
      id: "k3b",
      forkPoint: true,
      title: "Gecontroleerde noodoperatie",
      tbkTags: [
        "Operationele regie",
        "Prioriteiten",
      ],
      situation: "18:15 uur. Rotterdam draait beperkt door. Snelheid is laag maar er is overzicht. Toch groeit de druk: klanten willen updates, schepen wachten.",
      question: "Hoe beheer je de balans tussen zekerheid en snelheid?",
      choices: [
        {
          id: "A",
          label: "Gecontroleerd blijven werken",
          text: "Blijf werken met lage capaciteit en duidelijke prioriteiten.",
          quality: "best",
          next: "k4a",
          risk: {
            pros: 2,
            tech: 1,
          },
          meters: {
            recovery: 2,
            trust: 1,
          },
          consequence: "Langzaam maar betrouwbaar. Klanten weten wat ze kunnen verwachten.",
        },
        {
          id: "B",
          label: "Capaciteit opschalen",
          text: "Verhoog de handmatige capaciteit om meer containers te verwerken.",
          quality: "risky",
          next: "k4b",
          risk: {
            mens: 2,
            pros: 1,
          },
          meters: {
            pressure: 2,
            chain: 1,
          },
          consequence: "Volume stijgt maar ook het aantal fouten. Klanten krijgen tegenstrijdige updates.",
        },
      ],
    },
    {
      id: "k3c",
      forkPoint: true,
      title: "Chaos verspreidt zich naar de keten",
      tbkTags: [
        "Ketenmanagement",
        "Informatiebetrouwbaarheid",
      ],
      situation: "19:00 uur. Teams werken met eigen oplossingen. Containerinformatie verschilt per lijst. Klanten dreigen zendingen om te boeken via andere havens.",
      question: "Hoe stop je de informatieschaos?",
      choices: [
        {
          id: "A",
          label: "Centrale noodprocedure afdwingen",
          text: "Stop alle losse werkwijzen en dwing één centrale noodprocedure af.",
          quality: "best",
          next: "k4a",
          risk: {
            pros: 2,
            mens: 1,
          },
          meters: {
            recovery: 2,
            pressure: 1,
          },
          consequence: "Eén betrouwbare bron van informatie. Langzamer maar de keten kan vertrouwen op de data.",
        },
        {
          id: "B",
          label: "Lokale flexibiliteit bewaren",
          text: "Laat lokale teams flexibel blijven omdat zij hun terminal het beste kennen.",
          quality: "risky",
          next: "k4c",
          risk: {
            mens: 1,
            pros: 2,
          },
          meters: {
            chain: 2,
            operation: 2,
            pressure: 1,
          },
          consequence: "Lokale kennis wordt ingezet maar het systeem als geheel wordt steeds minder betrouwbaar.",
        },
      ],
    },
    {
      id: "k4a",
      title: "De Ghana-server",
      tbkTags: [
        "Herstelvermogen",
        "Datamanagement",
      ],
      situation: "Dag 2. In Ghana staat nog één server die niet is besmet — hij was tijdelijk offline. Deze server bevat de informatie om het wereldwijde netwerk opnieuw op te bouwen. De verbinding is te langzaam om alles via internet te sturen.",
      question: "Hoe gebruik je deze onverwachte lifeline?",
      choices: [
        {
          id: "A",
          label: "Wereldwijde hersteloperatie starten",
          text: "Gebruik de Ghana-kopie direct voor wereldwijd herstel ook als Rotterdam daardoor iets langer wacht.",
          quality: "best",
          next: "k5",
          risk: {
            pros: 2,
            tech: 1,
          },
          meters: {
            chain: -1,
            pressure: 1,
          },
          consequence: "Het wereldwijde netwerk herstelt als geheel. Rotterdam wacht maar de keten als geheel profiteert.",
        },
        {
          id: "B",
          label: "Eerste Rotterdam herstellen",
          text: "Maak eerst kopieën voor kritieke terminals voor wereldwijd herstel start.",
          quality: "acceptable",
          next: "k5",
          risk: {
            pros: 1,
            tech: 1,
          },
          meters: {
            recovery: 1,
            chain: 1,
          },
          consequence: "Rotterdam herstelt sneller maar het totale herstelproces duurt langer.",
        },
      ],
    },
    {
      id: "k4b",
      title: "Overbelasting noodprocessen",
      tbkTags: [
        "Informatiebetrouwbaarheid",
        "Klantvertrouwen",
      ],
      situation: "Dag 2. Door het opschalen van handmatig werk stijgt het volume maar ook het aantal fouten. Klanten krijgen tegenstrijdige updates.",
      question: "Hoe herstel je de betrouwbaarheid?",
      choices: [
        {
          id: "A",
          label: "Kwaliteit boven volume",
          text: "Verlaag capaciteit tijdelijk en prioriteer betrouwbare informatie boven snelheid.",
          quality: "best",
          next: "k5",
          risk: {
            pros: 2,
            mens: 1,
          },
          meters: {
            recovery: 2,
            trust: 1,
          },
          consequence: "Liever een eerlijke vertraging dan drie verschillende antwoorden. Vertrouwen herstelt.",
        },
        {
          id: "B",
          label: "Volume blijft prioriteit",
          text: "Blijf volume prioriteren om de achterstand zo snel mogelijk weg te werken.",
          quality: "risky",
          next: "k5",
          risk: {
            mens: 1,
            pros: 2,
          },
          meters: {
            pressure: 2,
            trust: -1,
            chain: 1,
          },
          consequence: "Achterstand loopt in maar klanten vertrouwen de informatie steeds minder.",
        },
      ],
    },
    {
      id: "k4c",
      title: "Vertrouwen onder druk",
      tbkTags: [
        "Reputatie",
        "Externe communicatie",
      ],
      situation: "Dag 2. Media-aandacht groeit. Klanten horen de schaal van de ramp voor het eerst via nieuwsmedia. Een journalist vraagt bevestiging.",
      question: "Hoe herstel je de communicatieregie?",
      choices: [
        {
          id: "A",
          label: "Open communiceren",
          text: "Communiceer transparant over de omvang, de noodprocessen en verwachte vertragingen.",
          quality: "best",
          next: "k5",
          risk: {
            mens: 2,
            pros: 1,
          },
          meters: {
            trust: 2,
            reputation: -1,
          },
          consequence: "Een supply chain kan vertraging aan. Onzekerheid is erger. Transparantie herstelt vertrouwen.",
        },
        {
          id: "B",
          label: "Intern focus",
          text: "Concentreer alle energie op herstel en houd externe communicatie minimaal.",
          quality: "risky",
          next: "k5",
          risk: {
            tech: 2,
            pros: 1,
          },
          meters: {
            trust: -1,
            chain: 1,
            reputation: 2,
          },
          consequence: "Herstel krijgt alle aandacht maar klanten voelen zich in de steek gelaten.",
        },
      ],
    },
    {
      id: "k5",
      title: "Evaluatie",
      tbkTags: [
        "Supply chain resilience",
        "Lessen",
      ],
      situation: "Dag 10. Na dagen van herstel komen systemen langzaam terug. Duizenden computers zijn opnieuw opgebouwd. De evaluatie is hard: digitale systemen zijn niet ondersteunend voor logistiek — ze zijn de logistiek.",
      question: "Ga door naar het definitieve advies.",
      choices: [
        {
          id: "A",
          label: "Conclusies verwerken",
          text: "Je verwerkt de bevindingen en bereidt het definitieve advies voor.",
          quality: "acceptable",
          next: "k6",
          risk: {},
          meters: {},
          consequence: "De board staat klaar voor de laatste bestuursvraag.",
        },
      ],
    },
    {
      id: "k6",
      title: "Definitief advies",
      tbkTags: [
        "Cyber resilience",
        "Supply chain beveiliging",
      ],
      situation: "De board stelt de definitieve vraag: welke structurele maatregel krijgt prioriteit om een volgende catastrofale uitval te voorkomen?",
      question: "Wat is jouw definitieve aanbeveling?",
      choices: [
        {
          id: "A",
          label: "Offline back-ups op meerdere locaties",
          text: "Zorg voor geteste offline back-ups op geografisch gespreide locaties. Als één regio uitvalt blijft herstel mogelijk.",
          quality: "best",
          next: "end_scenario",
          risk: {
            tech: 2,
            pros: 1,
          },
          meters: {
            recovery: 2,
          },
          consequence: "De Ghana-server was geluk. Maak dit beleid: altijd een schone kopie offline.",
        },
        {
          id: "B",
          label: "Netwerksegmentatie per regio",
          text: "Scheid regionale netwerken zodat een aanval in één land niet automatisch wereldwijd verspreidt.",
          quality: "best",
          next: "end_scenario",
          risk: {
            tech: 2,
            pros: 2,
          },
          meters: {
            recovery: 1,
          },
          consequence: "Structurele firebreak: een probleem in één regio moet niet de wereld plat kunnen leggen.",
        },
        {
          id: "C",
          label: "Noodprocedures voor handmatige logistiek",
          text: "Maak duidelijke noodprocedures voor handmatige operatie, klantcommunicatie en lading-prioritering.",
          quality: "acceptable",
          next: "end_scenario",
          risk: {
            mens: 2,
            pros: 2,
          },
          meters: {
            trust: 1,
          },
          consequence: "Als systemen uitvallen moeten teams weten wat ze mogen en moeten doen.",
        },
      ],
    },
  ],
}

export const scenarios = [pathe, odido, banken, vdl, chipsoft, maersk]
