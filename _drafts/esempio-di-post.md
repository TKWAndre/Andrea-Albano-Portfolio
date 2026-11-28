---
title: "Esempio di post: tutto quello che puoi usare"
descrizione: "Una frase che riassume il post. Compare sotto il titolo e nelle anteprime sui social."
categoria: video
luogo: Tokyo, Shibuya
coordinate: "35.6595° N, 139.7005° E"
attrezzatura: "Olympus E-M10 IV"
copertina: /assets/img/new/andrea-cover.webp
copertina_alt: "Cosa si vede nella foto di copertina"
copertina_fuoco: "60% 30%"
---

Questo è un post di prova: sta nella cartella `_drafts`, quindi **non compare sul sito**. Serve solo da esempio.

Un paragrafo normale. Lascia una riga vuota per andare a capo e iniziare un nuovo paragrafo. Puoi scrivere in **grassetto**, in *corsivo* e mettere [un link](https://www.instagram.com/andrealbano.mp4/).

## Un titoletto

- Un elenco puntato
- Un altro punto

1. Un elenco numerato, per i passaggi in ordine
2. Il secondo passaggio

> Una frase da mettere in evidenza, come un sottotitolo del film.

{% include foto.html src="/assets/img/new/andrea-cover.webp" alt="Cosa si vede" didascalia="Una foto da bordo a bordo" scatto="E-M10 IV, 14-42mm, f/5.6, 1/250 s, ISO 200" piena=true %}

{% include foto.html src="/assets/img/new/andrea-duo.webp" alt="Cosa si vede" didascalia="Una foto larga" larga=true %}

{% include galleria.html cartella="/assets/img/new/" foto="andrea-cover.webp, andrea-formal.webp, andrea-bn.webp" didascalia="Una galleria di tre foto" %}

{% include youtube.html id="CODICE_VIDEO" titolo="Il titolo del video" %}
