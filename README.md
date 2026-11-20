# Andrea Albano · Portfolio

Sito personale di Andrea Albano: Social Media Manager, video editor, content creator e setup per le dirette.

Online su: https://tkwandre.github.io/Andrea-Albano-Portfolio/

## Com'è fatto

HTML, CSS e JavaScript puri, senza framework e senza build. Si pubblica da solo con GitHub Pages a ogni modifica del ramo `main`.

| File | A cosa serve |
| --- | --- |
| `index.html` | La pagina, con i testi in italiano |
| `assets/js/data.js` | Lavori, percorso e setup: **si aggiorna qui** |
| `assets/js/i18n.js` | Traduzioni in inglese |
| `assets/js/main.js` | Interattività (color grading, timeline, filtri, modulo) |
| `assets/css/main.css` | Grafica; i colori sono in cima, in `:root` |
| `privacy.html` | Informativa del modulo contatti |

## Aggiungere un lavoro

Apri `assets/js/data.js`, copia un blocco dentro `works` e cambia i testi. Per una copertina con foto usa `cover: { type: "image", src: "assets/img/new/nome.webp" }`. Con `status: "soon"` compare il bollino "In montaggio".

## Provarlo in locale

```
python3 -m http.server 8000
```

poi apri http://localhost:8000
