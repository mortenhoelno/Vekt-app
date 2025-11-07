# Sunn Slanking for Livsnytere – Produktspesifikasjon

## 1. Visjon og verdiforslag
Sunn Slanking for Livsnytere skal være en varm og empatisk digital følgesvenn som hjelper norske brukere ned i vekt uten skyldfølelse. Appen kombinerer mindset-trening, matglede og varige vaner i et 3-måneders kurs med videre støtte for vedlikehold. Hele opplevelsen skal feire små seire og gi mestring gjennom positiv coaching, personlig oppfølging og motiverende gamification.

## 2. Funksjonell kravspesifikasjon
### 2.1 Bruker og autentisering
- Registrering via e-post/passord, Google og Apple ID.
- Sikker innlogging med JWT-baserte tokens eller tilsvarende mekanismer.
- Profilfelt: navn, alder, kursstartdato, startvekt, målvekt, kjønn (valgfritt), eventuelle preferanser for kosthold/allergier.
- Mulighet til å oppdatere profil og personverninnstillinger.

### 2.2 AI-coach
- Integrasjon med OpenAI GPT-5/4 (konfigurerbar via backend).
- Kontekstminne per bruker: tidligere samtaler, loggføringer, kursnivå og preferanser.
- Responsstil: empatisk, livsbejaende, motiverende.
- Triggere basert på nye loggføringer, oppnådd progresjon og kursnivå.
- Kan foreslå refleksjoner, oppgaver, utfordringer og feire seire.
- Mulighet til å sende AI-initierte meldinger (eks. ukentlig oppsummering, feiringer).

### 2.3 Kursmoduler
- Kursstruktur: oppstart + 6 hovedmoduler + avslutning.
- Hver modul inneholder videoer, tekstinnhold, refleksjonsspørsmål og praktiske oppgaver.
- Progresjonssporing med avhuking, prosentindikator og modul-badges.
- Innhold tilgjengelig offline etter nedlasting.
- AI-coach kan referere til modulinnhold og foreslå relevant materiale.

### 2.4 Logging og tracking
- Manuell registrering av kroppsdata: vekt, midje, hofte, lår, overarm, fett % og vann % (valgfritt).
- Daglige innsjekker for energi (1–10), humør (1–10) og refleksjonsnotater.
- Visualisering via tidslinje, diagrammer (linje- og stolpediagram) og ukentlige/månedlige rapporter.
- AI-kommentarer og innsikt til hver rapport.
- Eksportfunksjon (PDF/CSV) for loggdata.

### 2.5 Dagbok / journaling
- Daglige refleksjonskort med fritekst.
- AI-støttede spørsmål, eksempel: "Hva gikk bra i dag?", "Hva er du takknemlig for?".
- Tidslinjevisning og filtrering per uke/måned.
- Eksportmulighet og privat deling (pdf).

### 2.6 Gamification
- Poengsystem for aktiviteter: logging, modulferdigstillelse, refleksjoner, oppgaver.
- Badges/streaks: "Første innsjekk", "3-dagers streak", "Fullførte uke 1" osv.
- Bonusoppgaver med bildeopplasting eller tekst (lagres som minnegalleri).
- AI-genererte ukentlige feiringer og push-varseltekst.
- Lederbrett (valgfritt) for vennegrupper/bedriftsgrupper.

### 2.7 Dashboard
- Hjemskjerm med sammendrag: vekt/mål (graf), energi- og humørtrend, poeng og badges, kursprogresjon og AI-generert ukesoppsummering.
- Hurtigtilgang til logging, kursmodul og AI-chat.

### 2.8 Adminpanel
- Webbasert administrasjon for veiledere.
- Brukeroversikt, kursprogresjon og anonymisert aggregert statistikk.
- Mulighet til å sende utsendelser (meldinger, push-varsler) til grupper eller enkeltpersoner.
- Dataeksport (CSV/Excel) for rapportering.
- Moderasjonsverktøy for AI-samtaler og innhold.

### 2.9 Ikke-funksjonelle krav
- Responsiv og tilgjengelig UI med WCAG AA som mål.
- Norsk bokmål i hele appen, med mulighet for enkel oversettelse senere.
- GDPR-etterlevelse: samtykkehåndtering, dataportabilitet, sletting på forespørsel.
- Sikkerhet: kryptering av data i ro og i transitt, rollebasert tilgang for admin.
- Skalerbarhet for økt brukermasse og fremtidige integrasjoner.

## 3. Teknologistack og arkitektur
### 3.1 Klient
- **Flutter** for én felles kodebase til iOS, Android og web.
- State management: Riverpod eller Bloc for modulær logikk.
- Lokale lagringsmekanismer: Hive/Sqflite for cache, secure storage for tokens.

### 3.2 Backend
- **Supabase** (PostgreSQL + auth + storage) som hovedplattform.
- Edge Functions (Deno) for serverlogikk, webhook-håndtering og integrasjon mot OpenAI.
- Supabase Realtime for push-oppdateringer (eks. nye meldinger, badges).

### 3.3 Integrasjoner
- OpenAI API for AI-coachen (GPT-4/GPT-5).
- Firebase Cloud Messaging/Apple Push Notification service via Supabase for push-varsler.
- Mulige fremtidige integrasjoner: wearables (Apple Health, Google Fit) og smartvekter via separate mikroservicer.

### 3.4 Arkitekturdiagram (høynivå)
```
Flutter-klient <-> Supabase Auth
                <-> Supabase Database (PostgreSQL)
                <-> Supabase Storage (media, videoer)
                <-> Edge Functions (API, OpenAI-integrasjon)
Edge Functions <-> OpenAI Chat Completions API
Adminpanel (web) <-> Supabase (rolle: admin)
```

## 4. Datamodell
### 4.1 Entities
- **User**: id, email, hashed_password (ved egen auth), name, age, gender, start_weight, goal_weight, course_start_date, preferences, created_at, updated_at.
- **UserProfileSettings**: user_id, notification_opt_in, data_export_email, language.
- **CourseModule**: id, title, description, type (intro/core/outro), order, estimated_time.
- **CourseContentBlock**: id, module_id, content_type (video/text/task/reflection), content_url/body, metadata.
- **ModuleProgress**: user_id, module_id, status (not_started/in_progress/completed), completed_at, progress_percentage.
- **LogEntry**: id, user_id, date, weight, waist, hip, thigh, arm, body_fat, water_percent, energy_score, mood_score, notes, created_at.
- **JournalEntry**: id, user_id, date, prompt_id (optional), content, sentiment_score (AI), created_at.
- **PromptTemplate**: id, context (daily_checkin/module/celebration), text_nb.
- **Challenge**: id, title, description, type (bonus/streak), points, badge_id.
- **UserChallengeProgress**: id, user_id, challenge_id, status, progress_value, completed_at.
- **Badge**: id, name, description, icon_url, criteria_type (streak/progress/etc).
- **UserBadge**: id, user_id, badge_id, awarded_at.
- **AIConversation**: id, user_id, title, created_at.
- **AIMessage**: id, conversation_id, sender (user/coach/system), content, metadata (tokens, triggers), created_at.
- **WeeklySummary**: id, user_id, week_start, summary_text, highlights, suggestions.
- **AdminAnnouncement**: id, author_id, title, body, target_segment, scheduled_at.

### 4.2 Relasjoner og nøkkelregler
- `User` 1:M `LogEntry`, `JournalEntry`, `ModuleProgress`, `UserBadge`, `AIConversation`.
- `CourseModule` 1:M `CourseContentBlock`.
- `Challenge` M:N `User` via `UserChallengeProgress`.
- `AIConversation` 1:M `AIMessage`.
- Soft-delete eller anonymisering ved sletting for GDPR-etterlevelse.

### 4.3 Indeks- og ytelsesbetraktninger
- Indekser på (`user_id`, `date`) for logg- og journaldata.
- Partisjonering per bruker eller tidsperiode hvis volumet blir stort.
- Bruk Supabase Row Level Security for tilgangskontroll.

## 5. Brukerflyt og skjermbeskrivelser
### 5.1 Onboarding og registrering
1. Velkomstskjerm med merkevare og budskap "Du skal leve, ikke lide deg ned i vekt".
2. Valg av registreringsmetode (e-post, Google, Apple).
3. Profiloppsett: navn, alder, start- og målvekt, kursstart, preferanser.
4. Kort introduksjon til kursmoduler, AI-coach og logging.
5. Første samtale med AI-coach for å sette intensjoner.

### 5.2 Hovednavigasjon (tab bar)
- **Hjem**: dashboard med grafer, ukesoppsummering, snarveier.
- **Kurs**: moduloversikt, progresjon, innhold per modul.
- **Logg**: rask registrering av kroppsmål, energi og humør.
- **Dagbok**: refleksjoner, AI-spørsmål, tidslinje.
- **Coach**: chat med AI, tidligere samtaler og foreslåtte aktiviteter.

### 5.3 Kursflyt
- Modulkort viser status og poeng.
- Innholdsskjerm med videoavspiller, tekst og checkbokser for oppgaver.
- Refleksjonsfelt som kan sendes til AI for tilbakemelding.
- Fullføringsskjerm med badge og forslag til neste steg.

### 5.4 Logging
- Daglig innsjekk-widget med slider for energi/humør og felt for vekt/mål.
- Historikkvisning med grafer (vekt vs. tid, humørtrend) og filtrering.
- AI-kommentarer under grafene som tolker fremgangen.

### 5.5 Dagbok
- Liste over innlegg med dato, emojis og stikkord.
- Mulighet for stemme-til-tekst.
- Detaljvisning med AI-oppfølging og forslag til refleksjon.

### 5.6 AI-coach
- Chatgrensesnitt med kontekstkapsel som viser dagens fokus.
- Hurtighandlinger: "Logg dagens vekt", "Før refleksjon", "Spør om oppskrift".
- Ukentlig feiring/rapport generert automatisk med kort, delbar grafikk.

### 5.7 Gamification og badges
- Egen skjerm for poengsaldo, åpnede badges og kommende utfordringer.
- Streak-indikator på hjemskjermen.
- Push-varsler med vennlige budskap (maks 1–2 per dag).

### 5.8 Adminpanel
- Webdashboard med tabell over brukere, filter for kursstatus og fremgang.
- Mulighet til å åpne brukerprofil (lese journal med samtykke), sende melding og se aggregerte grafer.
- Utsendelsesplanlegger med forhåndsvisning av push-varseltekst.

## 6. AI-promptlogikk for coachen
### 6.1 Systemprompt
```
Du er "Livsnyter-coachen", en varm, empatisk og positiv mentor for norske brukere som deltar i Sunn Slanking for Livsnytere-programmet. Du feirer små seire, normaliserer motgang og gir praktiske forslag med fokus på matglede og varige vaner. Du skal aldri skape skyld eller skam, og du skriver alltid på norsk bokmål med emojis i passende mengde.
```

### 6.2 Kontekststrukturer
- Brukerprofil (mål, preferanser, modulnivå).
- Siste loggføringer (vekt, humør, energi) og trender.
- Kursprogresjon og nylig fullførte oppgaver.
- Journalnotater (samtykkebasert) med nøkkelord.
- Historikk fra siste `n` meldinger (f.eks. 10) for kontekst.

### 6.3 Promptoppsett pr. henvendelse
1. Systemprompt.
2. Viktig kontekst i JSON (brukerprofil, progresjon, loggtrender, aktive utfordringer).
3. Historikkmeldinger (user/assistant).
4. Ny brukerhenvendelse.
5. Instruks for svarformat (kortfattet, vennlig, foreslå neste steg).

### 6.4 Triggere
- Etter ny loggføring: send automatisk AI-melding med gratulasjon og innsikt.
- Ved oppnådd streak/badge: feir og foreslå neste utfordring.
- Ved lav energi/humør: tilby støtte, foreslå små tiltak.
- Ukentlig: generer oppsummering og oppfordring til neste uke.

## 7. Lagringsplan for kontekst og personalisering
- **Langtidskontekst**: lagres i Supabase-tabeller (`AIConversation`, `AIMessage`) med referanse til bruker.
- **Sammendragsteknikker**: periodisk (f.eks. ukentlig) opprett en Edge Function som summerer eldre samtaler til en "memory"-post lagret i `AIConversation` metadata for effektiv gjenhenting.
- **Cache**: ved chat forespørsel hentes siste meldinger + minne. Data sendes til OpenAI sammen med relevant logg/kursdata.
- **Personvern**: bruk feltmaskering og pseudonymisering ved behandling i AI-funksjoner. Lagre eksplisitt samtykke for bruk av journaldata i coach-samtaler.
- **Konfigurasjon**: per bruker kan man slå av/på AI-personalisering fra sensitive data.

## 8. MVP-plan
### Fase 1: Kjernelansering (0–2 måneder)
- Flutter-app med onboarding, profil, enkel kursoversikt (tekst/video), AI-chat (grunnleggende historikk).
- Manuell logging av vekt, energi og humør med graf over tid.
- Dagbok med fritekst og en daglig AI-spørsmål.
- Poeng for logging og modulfullførelse, grunnleggende badges.
- Ukentlig AI-oppsummering sendt via app.
- Adminpanel: enkel brukeroversikt og mulighet til å sende meldinger.

### Fase 2: Utvidelser (2–4 måneder)
- Full modulstruktur (video, refleksjon, oppgaver) med offline cache.
- Utvidet logging (kroppsmål, fett %, vann %).
- Dagboktidslinje, eksportfunksjon og bildeopplasting for utfordringer.
- Gamification: streaks, bonusoppgaver, grafisk badge-galleri.
- Automatiserte AI-triggere ved progresjon eller lav motivasjon.

### Fase 3: Vedlikehold og videre vekst (4–6 måneder)
- Avansert rapportering (månedlig rapport, AI-innsikt).
- Adminpanel med aggregert statistikk og dataeksport.
- Push-variasjon med personaliserte meldinger.
- Integrasjoner mot wearables og smartvekter (pilot).
- Personlig planlegger og kalender med AI-genererte forslag.

## 9. Fremtidige muligheter
- Gruppestøtte: vennegrupper, interne bedriftsgrupper med delte utfordringer.
- Live-workshops med strømmet video og chat.
- Oppskriftsbibliotek med AI-genererte menyforslag basert på brukerens preferanser.
- Marketplace for veiledningstimer og premium-innhold.

## 10. Suksessmetrikk
- Brukerretensjon 3 måneder: >75%.
- Gjennomsnittlig ukentlig logging: minst 4 registreringer per bruker.
- AI-chat tilfredshet (CSAT): >4,5/5.
- Kursfullførelse: >60% av aktive brukere.
- Net Promoter Score: >45.

## 11. Personvern og sikkerhet
- Samtykkeinnhenting ved registrering og ved bruk av sensitive data (journal, kroppsmål).
- Databehandleravtaler og vurdering av OpenAI som underleverandør.
- Kryptert kommunikasjon (HTTPS/TLS) og lagring (Supabase krypterte kolonner for sensitive felt).
- Rutiner for dataportabilitet og sletting innen 30 dager etter forespørsel.

## 12. Prosjektroller og samarbeid
- Produktleder, UX/UI-designer, mobilutvikler(e), backend/DevOps, AI-ingeniør, innholdsprodusent, helsefaglig rådgiver.
- Tett samarbeid med kursinstruktører for modulinnhold og tone of voice.

---
Denne spesifikasjonen danner grunnlaget for design, utvikling og lansering av Sunn Slanking for Livsnytere-appen og skal oppdateres fortløpende etter hvert som innsikt og behov utvikler seg.
