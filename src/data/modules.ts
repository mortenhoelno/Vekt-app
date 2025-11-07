import { CourseModule } from "@/types";

export const defaultModules: CourseModule[] = [
  {
    id: "intro",
    title: "Velkommen og mindset",
    description: "Bli kjent med reisen og bygg et varmt, støttende tankesett.",
    order: 0,
    completed: false,
    content: [
      {
        id: "intro-video",
        title: "Introduksjon",
        type: "video",
        durationMinutes: 8,
        description: "Møt coachen din og sett retning for de neste ukene."
      },
      {
        id: "refleksjon-grunnlag",
        title: "Refleksjon: Hvorfor nå?",
        type: "øvelse",
        description: "Journalfør hva som gjør deg klar for denne reisen akkurat nå."
      }
    ]
  },
  {
    id: "modul1",
    title: "Matglede uten dårlig samvittighet",
    description: "Utforsk matglede med intuitive porsjoner og vennlig egenomsorg.",
    order: 1,
    completed: false,
    content: [
      {
        id: "matglede-video",
        title: "Matglede i praksis",
        type: "video",
        durationMinutes: 12,
        description: "Coach Sunniva viser hvordan du lager nærende måltider med ro."
      },
      {
        id: "oppgave-frokost",
        title: "Oppgave: design frokost",
        type: "øvelse",
        description: "Planlegg morgendagens frokost som gir både energi og glede."
      }
    ]
  },
  {
    id: "modul2",
    title: "Vaneendring som varer",
    description: "Lær mikrosteg og forsterk positive signaler i hverdagen.",
    order: 2,
    completed: false,
    content: [
      {
        id: "mikrosteg-artikkel",
        title: "Artikkel: mikrosteg",
        type: "artikkel",
        description: "Slik bygger du vaner som passer inn i livet du ønsker å leve."
      },
      {
        id: "øvelse-feiring",
        title: "Øvelse: feir små seire",
        type: "øvelse",
        description: "Lag en liste over tre små ting du kan feire denne uken."
      }
    ]
  },
  {
    id: "modul3",
    title: "Kroppens signaler",
    description: "Lytt til sult, metthet og energi som veivisere.",
    order: 3,
    completed: false,
    content: [
      {
        id: "energi-video",
        title: "Energikompasset",
        type: "video",
        durationMinutes: 9,
        description: "Finn ditt personlige energikompass for hverdagsvalg."
      }
    ]
  },
  {
    id: "modul4",
    title: "Bevegelse med glede",
    description: "Utforsk lystbetonte aktiviteter som gir påfyll.",
    order: 4,
    completed: false,
    content: [
      {
        id: "bevegelse-utfordring",
        title: "Utfordring: din første tur",
        type: "øvelse",
        description: "Ta et bilde av en tur i naturen og del følelsen i dagboken."
      }
    ]
  },
  {
    id: "modul5",
    title: "Fellesskap og støtte",
    description: "Bygg nettverk og støtt deg på andre i programmet.",
    order: 5,
    completed: false,
    content: [
      {
        id: "fellesskap-artikkel",
        title: "Artikkel: vi løfter hverandre",
        type: "artikkel",
        description: "Finn måter å hente energi fra menneskene rundt deg."
      }
    ]
  },
  {
    id: "modul6",
    title: "Vedlikehold og feiring",
    description: "Fest resultatene og planlegg videre støtte.",
    order: 6,
    completed: false,
    content: [
      {
        id: "plan-video",
        title: "Din livsglade plan",
        type: "video",
        durationMinutes: 10,
        description: "Oppsummer reisen og skap et vedlikeholdsrituale."
      }
    ]
  }
];
