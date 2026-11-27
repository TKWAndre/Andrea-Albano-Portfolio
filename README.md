# Andrea Albano · Portfolio

Sito personale di Andrea Albano: Social Media Manager, video editor, content creator e setup per le dirette.

Online su: https://tkwandre.github.io/Andrea-Albano-Portfolio/

## Com'è fatto

HTML, CSS e JavaScript puri, senza framework. Si pubblica da solo con GitHub Pages a ogni modifica del ramo `main`. Il blog usa Jekyll, che GitHub Pages esegue da solo: non serve installare niente.

| File | A cosa serve |
| --- | --- |
| `index.html` | La pagina, con i testi in italiano |
| `assets/js/data.js` | Lavori, percorso e setup: **si aggiorna qui** |
| `assets/js/i18n.js` | Traduzioni in inglese |
| `assets/js/main.js` | Interattività (color grading, timeline, filtri, modulo) |
| `assets/css/main.css` | Grafica; i colori sono in cima, in `:root` |
| `privacy.html` | Informativa del modulo contatti |
| `_posts/` | I post del blog, in Markdown: **si scrivono qui** |
| `blog/index.html` | La pagina con l'elenco dei post |
| `_layouts/`, `_includes/` | Lo stampo delle pagine del blog |
| `assets/css/blog.css` | Grafica del blog |
| `_config.yml` | Impostazioni di Jekyll e categorie dei post |

## Scrivere un post

Leggi [COME-SCRIVERE-UN-POST.md](COME-SCRIVERE-UN-POST.md): modello da copiare, foto, video e privacy.

## Aggiungere un lavoro

Apri `assets/js/data.js`, copia un blocco dentro `works` e cambia i testi. Per una copertina con foto usa `cover: { type: "image", src: "assets/img/new/nome.webp" }`. Con `status: "soon"` compare il bollino "In montaggio".

## Provarlo in locale

Con Ruby installato:

```
gem install bundler github-pages webrick
jekyll serve --baseurl /Andrea-Albano-Portfolio
```

poi apri http://localhost:4000/Andrea-Albano-Portfolio/. Con `python3 -m http.server` non funziona più: la home ha bisogno di Jekyll per la sezione blog.
