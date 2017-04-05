# Dokumentasjon for treningseksamen IT2

## Programvare
Utviklingsoppgaven er løst ved hjelp av webteknologiene HTML, Javascript og CSS, som kjøres i en nettleser. For å løse oppgaven er det i tillegg tatt i bruk et bibliotek for Javascript, som heter p5.js. Det er integrert i besvarelsesfilene.

Det kreves en moderne nettleser som kan kjøre HTML5 og en HTTP-server å servere filene fra.

I mappen følger det med et enkelt serverprogram, kalt *server.exe* (kun Windows). Når denne kjører kan koden kjøres ved å gå til [localhost:8000](http://localhost:8000) i nettleseren.

## Oppgave 1 | Animasjon

### Kravspesifikasjon
- En bil skal kjøre over skjermen
- Skilt skal komme opp foran bilen, og bilen skal bråstoppe
- Medfølgende lyder og bilder skal brukes på en rimelig måte


## Oppgave 2a | Animasjon

### Kravspesifikasjon
- Bruker skal kunne legge inn avstand for måling
- Mulighet for å legge inn tid, enten direkte eller ved hjelp av stoppeklokke
- Utregnet hastighet skal vises på skjerm



## Oppgave 2b | Animasjon

### Kravspesifikasjon
- Inndatamulighet for fartsgrense
- Dersom fartsmålingen viser at bilen kjører for fort skal det skrives ut en fartsbot
- Fartsboten skal inneholde dato, klokkeslett, reg.nr., fart og botens størrelse



## Oppgave 3 | Animasjon
### Kravspesifikasjon
- En database med ulike kjøretøy
- Hver post i databasen skal ha reg.nr., type kjøretøy og fartsbegrensning
- Databasen skal være en tabell
- Programmet i oppgave 2 skal sjekke registreringsnummer mot databasen
- Skal sjekke om kjøretøyet bryter med sin begrensning
- Dersom kjøretøyet bryter grensen skal det skrives ut en bot på samme måte som i oppgave 2 men denne gangen også med felter for type kjøretøy og kjøretøyets fartsgrense. Botens størrelse er 10 000kr
