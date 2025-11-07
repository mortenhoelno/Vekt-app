# Sunn Slanking for Livsnytere – kryssplattform app

Dette prosjektet er et Expo/React Native-basert utgangspunkt for den digitale coachen Sunn Slanking for Livsnytere. Appen er designet for å kjøres på iOS, Android og web via Expo, og følger stemningen fra produktspesifikasjonen.

## Funksjoner
- 🌱 Innlogging med personlig profil og mål
- 📊 Dashboard med siste logg, kursprogresjon og ukesfeiring
- 🧠 Kursmoduler med fullføringsstatus og badges
- 📝 Manuell logging av vekt, midje, energi, humør og refleksjon
- 📔 Dagbok med AI-inspirerte spørsmål og tidslinje
- 💬 AI-coach integrert mot OpenAI Chat Completions API (GPT-4o mini)
- 🎖️ Poeng og badges for motivasjon og streaks
- 💾 Lokal lagring av fremgang via AsyncStorage

## Kom i gang

1. Installer avhengigheter
   ```bash
   npm install
   ```

2. Legg til en OpenAI-nøkkel som miljøvariabel før du starter appen:
   ```bash
   export EXPO_PUBLIC_OPENAI_API_KEY="sk-..."
   ```
   Alternativt kan du legge inn nøkkelen i `app.json` under `extra.openaiKey`.

3. Start Expo
   ```bash
   npm run start
   ```

4. Åpne appen i Expo Go (mobil) eller trykk `w` for å åpne web-klienten.

## Struktur
- `app/` – skjermer definert med Expo Router (faner for dashboard, kurs, logg, dagbok, coach og profil)
- `src/context/` – global tilstand for autentisering, logging, gamification og chat
- `src/services/` – integrasjon mot OpenAI og lokal lagring
- `src/components/` – gjenbrukbare UI-elementer
- `src/data/` – standard kursmoduler

## Videre arbeid
- Koble til ekte autentisering (Supabase/Firebase) og serverlagring
- Lage adminflate for gruppeoppfølging
- Visualisere progresjon med grafer (f.eks. Victory Native eller Recharts)
- Implementere push-varsler og automatiske feiringer
- Bygge serverkomponenter for vedvarende AI-kontekst per bruker

## Publisere til GitHub
Følg disse stegene for å legge prosjektet på GitHub etter at du har installert [Git](https://git-scm.com/downloads) og opprettet et repository på github.com:

1. Koble det lokale repoet til GitHub (erstatt `BRUKERNAVN` og `REPO` med dine verdier):
   ```bash
   git remote add origin git@github.com:BRUKERNAVN/REPO.git
   # eller bruk HTTPS
   git remote add origin https://github.com/BRUKERNAVN/REPO.git
   ```

2. Sjekk at remote ble lagt til riktig:
   ```bash
   git remote -v
   ```

3. Push den eksisterende historikken (hovedgrenen heter `work` her – bytt til `main` hvis du foretrekker det):
   ```bash
   git push -u origin work
   ```

4. Etter nye endringer:
   ```bash
   git add .
   git commit -m "Din beskrivelse"
   git push
   ```

5. Opprett pull requests og administrer versjoner direkte i GitHub-grensesnittet.

Hvis du bruker GitHub Desktop, kan du i stedet velge **File → Add local repository** og følge veiviseren for å publisere til GitHub.

Med dette grunnlaget kan teamet raskt bygge videre på en helhetlig, varm og motiverende brukeropplevelse.

### Alternativ: last opp en Git bundle
Hvis du ikke kan pushe direkte fra utviklingsmiljøet (f.eks. på grunn av nettverksbegrensninger), kan du generere en `git bundle` og laste den opp via GitHub Importer:

1. Kjør skriptet som lager en bundle:
   ```bash
   ./scripts/create-github-bundle.sh
   ```

2. Gå til [GitHub Importer](https://github.com/new/import) og velg **Upload a file**.

3. Last opp `dist/vekt-app.bundle` og følg stegene i import-veiviseren.

4. Når repoet er importert, kan du klone det lokalt og fortsette å jobbe som vanlig:
   ```bash
   git clone git@github.com:BRUKERNAVN/REPO.git
   ```

Skriptet fjerner automatisk eventuelle gamle bundler, slik at filen alltid gjenspeiler siste commit-historikk.
