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
copertina: /assets/img/blog/tokyo-con-una-bimba/copertina.webp
copertina_alt: "Cosa si vede nella foto"
---

Qui inizia il testo del post.
```

- **categoria**: scrivi `viaggi`, `video` oppure `social`.
- **luogo** e **coordinate**: facoltativi. Le coordinate le trovi su Google Maps: tieni premuto sul punto e copi i numeri.
- **copertina**: facoltativa. Va bene larga e bassa, come un fotogramma di film (circa 2400 × 1000 pixel).

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

**Foto nel testo:**

```
{% include foto.html src="/assets/img/blog/nome-post/foto.webp" alt="Cosa si vede" didascalia="Testo sotto la foto" larga=true %}
```

Togli `larga=true` se vuoi la foto alta come il testo. `didascalia` si può togliere.

**Video YouTube:**

```
{% include youtube.html id="CODICE" titolo="Titolo del video" %}
```

Il codice è la parte del link dopo `v=` (o dopo `youtu.be/`).

Un esempio con tutto si trova in `_drafts/esempio-di-post.md`. I file in `_drafts` non vengono pubblicati.

## 4. Le foto

1. Caricale in `assets/img/blog/nome-del-post/` (**Add file → Upload files**).
2. Prima di caricarle, rimpicciolisci a circa 2000 pixel di lato e, se puoi, convertile in `.webp` (per esempio con squoosh.app). Il sito resta veloce.
3. **Privacy:** le foto del telefono contengono la posizione GPS. Squoosh la toglie. In alternativa, su iPhone: Condividi → Opzioni → disattiva "Posizione".
4. Controlla ogni foto: tua figlia non deve comparire, neanche di spalle o riflessa.

## 5. Vuoi preparare un post senza pubblicarlo?

Aggiungi `published: false` nel modello in cima. Quando è pronto, togli la riga.

## Problemi comuni

- **Il post non compare:** controlla il nome del file (data con i trattini, finisce con `.md`) e che la data non sia nel futuro.
- **Il sito non si aggiorna:** su GitHub, scheda **Actions**: se c'è una croce rossa, aprila e leggi l'errore. Di solito è una virgoletta mancante nel modello in cima.
