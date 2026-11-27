# Come scrivere un post del blog

Ogni post è un file di testo nella cartella `_posts`. Quando lo salvi su GitHub (ramo `main`), dopo un paio di minuti è online da solo, nella pagina Blog e nella home.

## 1. Crea il file

Su GitHub, dal computer o dall'app: apri la cartella `_posts`, poi **Add file → Create new file**.

Il nome del file deve essere così: `ANNO-MESE-GIORNO-titolo-con-trattini.md`

Esempio: `2026-12-10-tokyo-con-una-bimba-di-16-mesi.md`

Niente spazi, niente accenti, tutto minuscolo. La parte dopo la data diventa l'indirizzo del post.

## 2. Copia questo modello in cima

```
---
title: "Il titolo del post"
descrizione: "Una o due frasi. Compaiono sotto il titolo e nell'anteprima quando condividi il link."
categoria: viaggi
luogo: Tokyo, Shibuya
coordinate: "35.6595° N, 139.7005° E"
attrezzatura: "Olympus E-M10 IV"
copertina: /assets/img/blog/tokyo-con-una-bimba/copertina.webp
copertina_alt: "Cosa si vede nella foto"
copertina_fuoco: "50% 30%"
---

Qui inizia il testo del post.
```

- **categoria**: scrivi `viaggi`, `video` oppure `social`.
- **luogo** e **coordinate**: facoltativi. Le coordinate le trovi su Google Maps: tieni premuto sul punto e copi i numeri.
- **attrezzatura**: facoltativa. Compare nella scheda del post come "Scattato con".
- **copertina**: è la foto che apre il post a tutto schermo, con il titolo sopra. Scegli una foto orizzontale, larga almeno 2400 pixel, con una zona tranquilla in basso a sinistra: lì va il titolo.
- **copertina_fuoco**: facoltativo. Dice quale punto della foto deve restare sempre visibile quando lo schermo la taglia (sul telefono la foto diventa verticale). Il primo numero va da sinistra (0%) a destra (100%), il secondo dall'alto (0%) al basso (100%). Se il soggetto è al centro, toglilo.

## 3. Scrivi il testo

| Vuoi | Scrivi |
| --- | --- |
| Un nuovo paragrafo | lascia una riga vuota |
| Un titoletto | `## Titoletto` |
| Grassetto | `**parola**` |
| Corsivo | `*parola*` |
| Un link | `[testo](https://indirizzo)` |
| Un elenco | una riga per punto che inizia con `- ` |
| Una frase in evidenza (stile sottotitolo) | `> La frase` |

**Una foto:**

```
{% include foto.html src="/assets/img/blog/nome-post/foto.webp" alt="Cosa si vede" %}
```

Dentro la stessa riga puoi aggiungere:

| Aggiungi | Cosa fa |
| --- | --- |
| `didascalia="Testo"` | una riga sotto la foto |
| `scatto="E-M10 IV, 14-42mm, f/5.6, 1/250 s, ISO 200"` | i dati di scatto, in piccolo |
| `larga=true` | la foto esce dalla colonna di testo |
| `piena=true` | la foto va da un bordo all'altro dello schermo |

**Una galleria:** carica le foto in una cartella e scrivi una riga sola. Si impagina da sola, a righe, rispettando il formato di ogni foto (orizzontali e verticali insieme).

```
{% include galleria.html cartella="/assets/img/blog/nome-post/giorno-1/" %}
```

Le foto compaiono in ordine di nome, quindi chiamale `01.webp`, `02.webp` e così via. Se vuoi sceglierne solo alcune:

```
{% include galleria.html cartella="/assets/img/blog/nome-post/" foto="tempio.webp, strada.webp" %}
```

Due foto nella stessa galleria finiscono affiancate. Puoi aggiungere `didascalia="Testo"`.

Chi legge può toccare qualsiasi foto per aprirla a schermo intero e scorrerle tutte, con le frecce o con il dito.

**Video YouTube:**

```
{% include youtube.html id="CODICE" titolo="Titolo del video" %}
```

Il codice è la parte del link dopo `v=` (o dopo `youtu.be/`).

Un esempio con tutto si trova in `_drafts/esempio-di-post.md`. I file in `_drafts` non vengono pubblicati.

## 4. Le foto

1. Caricale in `assets/img/blog/nome-del-post/` (**Add file → Upload files**). Per una galleria usa una sottocartella, per esempio `giorno-1/`.
2. Prima di caricarle, rimpicciolisci il lato lungo a 2400 pixel e convertile in `.webp` con qualità 80 circa (per esempio con squoosh.app). Una foto della Olympus pesa 8-10 MB: così scende sotto i 500 KB senza differenze visibili, e il sito resta veloce.
3. **Privacy:** le foto del telefono contengono la posizione GPS. Squoosh la toglie. In alternativa, su iPhone: Condividi → Opzioni → disattiva "Posizione".
4. Controlla ogni foto: tua figlia non deve comparire, neanche di spalle o riflessa.

## 5. Vuoi preparare un post senza pubblicarlo?

Aggiungi `published: false` nel modello in cima. Quando è pronto, togli la riga.

## Problemi comuni

- **Il post non compare:** controlla il nome del file (data con i trattini, finisce con `.md`) e che la data non sia nel futuro.
- **Il sito non si aggiorna:** su GitHub, scheda **Actions**: se c'è una croce rossa, aprila e leggi l'errore. Di solito è una virgoletta mancante nel modello in cima.
