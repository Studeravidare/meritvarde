const express = require("express");
const router = express.Router();

// Temporär info
const utbildningar = [
  {
    namn: "Förskollärarprogrammet",
    minMerit: 10,
    beskrivning:
      "Förskollärarprogrammet förbereder dig för att arbeta med barns tidiga utveckling och lärande. Du får kunskap inom pedagogik, barns psykologi och skapande verksamhet för att stödja deras utveckling.",
  },
  {
    namn: "Yrkeslärarprogrammet",
    minMerit: 10,
    beskrivning:
      "Detta program riktar sig till dig som vill bli yrkeslärare inom gymnasieskolans yrkesprogram. Utbildningen kombinerar pedagogik med din yrkeserfarenhet för att förbereda dig för undervisning.",
  },
  {
    namn: "Religionsvetarprogrammet",
    minMerit: 10,
    beskrivning:
      "Ett program för dig som är intresserad av religionens roll i samhället, kultur och historia. Du studerar olika religioner, livsåskådningar och etiska frågor samt deras påverkan på världen.",
  },
  {
    namn: "Lantmätarprogrammet",
    minMerit: 10,
    beskrivning:
      "En utbildning som ger dig kompetens inom mark- och fastighetsjuridik, kartläggning och stadsplanering. Som lantmätare arbetar du med att utveckla och förvalta mark- och fastighetstillgångar.",
  },
  {
    namn: "Dataingenjörsprogrammet",
    minMerit: 10,
    beskrivning:
      "Programmet ger en teknisk grund inom mjukvaruutveckling, nätverk och datasystem. Du lär dig att designa, programmera och implementera datorsystem för olika ändamål.",
  },
  {
    namn: "Grundlärarprogrammet",
    minMerit: 12,
    beskrivning:
      "Grundlärarprogrammet utbildar dig till att undervisa i grundskolan. Programmet kombinerar pedagogik, didaktik och ämneskunskaper för att förbereda dig för en karriär inom undervisning.",
  },
  {
    namn: "Socionomprogrammet",
    minMerit: 12,
    beskrivning:
      "En utbildning för dig som vill arbeta med socialt arbete, psykologi och juridik. Som socionom kan du arbeta med utsatta grupper inom socialtjänst, skola eller sjukvård.",
  },
  {
    namn: "Biologiprogrammet",
    minMerit: 12,
    beskrivning:
      "Biologiprogrammet ger dig en djup förståelse för ekologi, genetik, mikrobiologi och evolution. Du kan arbeta inom forskning, miljövård eller bioteknik.",
  },
  {
    namn: "Miljövetarprogrammet",
    minMerit: 12,
    beskrivning:
      "Utbildningen fokuserar på hållbar utveckling, klimatförändringar och ekosystem. Som miljövetare kan du arbeta med miljöfrågor inom myndigheter, företag eller organisationer.",
  },
  {
    namn: "Sjuksköterskeprogrammet",
    minMerit: 14,
    beskrivning:
      "Programmet förbereder dig för att bli legitimerad sjuksköterska. Du får kunskaper inom vård, medicin och omvårdnad för att kunna arbeta inom sjukvården och hjälpa patienter.",
  },
  {
    namn: "Personalvetarprogrammet",
    minMerit: 14,
    beskrivning:
      "En utbildning inom HR, arbetsrätt och organisationspsykologi. Som personalvetare kan du arbeta med rekrytering, arbetsmiljöfrågor och ledarskapsutveckling.",
  },
  {
    namn: "Systemvetenskap",
    minMerit: 14,
    beskrivning:
      "Detta program ger dig en bred kunskap inom IT, databashantering och affärssystem. Systemvetare arbetar ofta med att utveckla och förbättra digitala system i företag.",
  },
  {
    namn: "Tandläkarprogrammet",
    minMerit: 16,
    beskrivning:
      "Utbildningen ger dig teoretiska och praktiska kunskaper inom tandvård, diagnostik och behandling. Som tandläkare arbetar du med att förebygga och behandla tand- och munhälsa.",
  },
  {
    namn: "Civilingenjörsprogrammet",
    minMerit: 18,
    beskrivning:
      "Ett femårigt program som ger en djupgående teknisk utbildning inom en rad olika specialiseringar. Civilingenjörer arbetar med innovation, problemlösning och avancerad teknik.",
  },
  {
    namn: "Arkitektprogrammet",
    minMerit: 18,
    beskrivning:
      "En utbildning där du får utveckla kunskaper inom byggdesign, hållbart byggande och stadsplanering. Som arkitekt arbetar du med att skapa funktionella och estetiska byggnader.",
  },
  {
    namn: "Läkarprogrammet",
    minMerit: 20,
    beskrivning:
      "Utbildningen ger dig bred medicinsk kunskap och praktisk erfarenhet inom sjukvården. Som läkare diagnostiserar och behandlar du patienter inom olika medicinska specialiteter.",
  },
  {
    namn: "Psykologprogrammet",
    minMerit: 20,
    beskrivning:
      "Psykologprogrammet utbildar dig i mänskligt beteende, kognition och emotionell hälsa. Som psykolog kan du arbeta med terapi, utredningar och organisationsutveckling.",
  },
  {
    namn: "Juristprogrammet",
    minMerit: 20,
    beskrivning:
      "Ett program som ger djupgående kunskaper inom lagstiftning och juridisk analys. Jurister arbetar inom domstolar, myndigheter, företag och advokatbyråer.",
  },
  {
    namn: "Civilingenjör i teknisk fysik",
    minMerit: 20,
    beskrivning:
      "Ett av de mest avancerade ingenjörsprogrammen med fokus på matematik, fysik och tekniska tillämpningar. Teknisk fysik ger en bred bas för arbete inom forskning och utveckling.",
  },
  {
    namn: "Kandidatprogram i biomedicin",
    minMerit: 20,
    beskrivning:
      "Biomedicinprogrammet ger kunskap inom medicinsk forskning, cellbiologi och laboratorieteknik. Det förbereder dig för en karriär inom läkemedelsutveckling eller medicinsk forskning.",
  },
];

// 
router.get("/", (req, res) => {
  console.log("GET /utbildningar endpoint hit!");
  const meritvärde = parseFloat(req.query.meritvärde);

  if (isNaN(meritvärde)) {
    return res.status(400).json({ error: "Ogiltigt meritvärde" });
  }

  const matchadeUtbildningar = utbildningar.filter(
    (utb) => utb.minMerit <= meritvärde
  );
  res.json(matchadeUtbildningar);
});

module.exports = router;
