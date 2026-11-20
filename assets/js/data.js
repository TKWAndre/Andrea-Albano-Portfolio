/*
  CONTENUTI DEL SITO
  ------------------
  Qui ci sono i lavori, il percorso e i testi in inglese.
  Per aggiungere un lavoro: copia un blocco dentro WORKS e cambia i testi.
  Ogni testo ha la versione italiana (it) e inglese (en).
  Ruoli possibili: "smm", "video", "content", "live", "web".
*/

window.SITE_DATA = {
  roles: {
    smm: { it: "Social Media", en: "Social Media" },
    video: { it: "Video editing", en: "Video editing" },
    content: { it: "Contenuti", en: "Content" },
    live: { it: "Live", en: "Live" },
    web: { it: "Web", en: "Web" }
  },

  works: [
    {
      id: "gaiacoords",
      roles: ["smm", "content", "web"],
      year: "2026",
      status: "live",
      cover: { type: "image", src: "assets/img/gaiacoords/cover.webp" },
      fit: "contain",
      gallery: [
        "assets/img/gaiacoords/tshirt-japan-serenity.webp",
        "assets/img/gaiacoords/felpa-saint-tropez.webp",
        "assets/img/gaiacoords/tshirt-milano.webp",
        "assets/img/gaiacoords/cappellino-pink-wave.webp",
        "assets/img/gaiacoords/cappellino-logo.webp"
      ],
      title: { it: "GaiaCoords", en: "GaiaCoords" },
      kicker: { it: "Brand e-commerce · fondatore", en: "E-commerce brand · founder" },
      summary: {
        it: "Ho fondato e gestisco un brand streetwear online: t-shirt, felpe, cappellini e accessori ispirati a mappe, luoghi e Giappone. Dal nome al sito, l'ho costruito da solo.",
        en: "I founded and run an online streetwear brand: t-shirts, hoodies, caps and accessories inspired by maps, places and Japan. From the name to the website, I built it on my own."
      },
      points: {
        it: ["Brand identity e logo", "Sito creato da zero, con SEO", "Contenuti e gestione dei social", "Ordini, clienti e assistenza"],
        en: ["Brand identity and logo", "Website built from scratch, with SEO", "Content and social media management", "Orders, customers and support"]
      },
      link: { href: "https://www.gaiacoords.com", it: "Visita il sito", en: "Visit the website" }
    },
    {
      id: "personal-brand",
      roles: ["smm", "content"],
      year: "2026",
      status: "live",
      cover: { type: "image", src: "assets/img/new/andrea-duo.webp" },
      gallery: [
        "assets/img/new/andrea-duo.webp",
        "assets/img/new/andrea-bn.webp",
        "assets/img/new/andrea-cover.webp",
        "assets/img/new/andrea-avatar.webp"
      ],
      title: { it: "Carosello personal brand", en: "Personal brand carousel" },
      kicker: { it: "Instagram · grafica e copy", en: "Instagram · design and copy" },
      summary: {
        it: "Un carosello Instagram che presenta i miei quattro ruoli, con un tono professionale ma simpatico. Stesso scatto, quattro look diversi.",
        en: "An Instagram carousel that introduces my four roles, with a tone that is professional but friendly. One shot, four different looks."
      },
      points: {
        it: ["Concept e struttura delle slide", "Trattamento colore coerente", "Copy breve, pensato per lo scroll"],
        en: ["Concept and slide structure", "Consistent colour treatment", "Short copy, made for scrolling"]
      }
    },
    {
      id: "japan",
      roles: ["video", "content"],
      year: "2026",
      status: "soon",
      cover: { type: "japan", label: "日本" },
      title: { it: "Giappone in famiglia", en: "Japan with the family" },
      kicker: { it: "Vlog di viaggio · in montaggio", en: "Travel vlog · in the edit" },
      summary: {
        it: "Due settimane in Giappone, dal 23 novembre al 7 dicembre: di giorno con la famiglia, di sera da solo in città. Girato con iPhone 15 e DJI Mic Mini, montato in DaVinci Resolve.",
        en: "Two weeks in Japan, from 23 November to 7 December: daytime with the family, evenings alone in the city. Shot on iPhone 15 with a DJI Mic Mini, edited in DaVinci Resolve."
      },
      points: {
        it: ["Vlog lungo per YouTube", "Short verticali per Reels e TikTok", "Sottotitoli in inglese"],
        en: ["Long-form vlog for YouTube", "Vertical shorts for Reels and TikTok", "English subtitles"]
      }
    },
    {
      id: "live-setup",
      roles: ["live"],
      year: "2026",
      status: "live",
      cover: { type: "live", label: "ON AIR" },
      title: { it: "Setup per le dirette", en: "Live stream setup" },
      kicker: { it: "Audio, video e regia", en: "Audio, video and switching" },
      summary: {
        it: "Preparo il setup per andare in diretta senza sorprese: inquadratura, audio pulito, scene e test della connessione. Anni di supporto tecnico mi hanno insegnato a risolvere i problemi prima che li veda il pubblico.",
        en: "I set up everything needed to go live without surprises: framing, clean audio, scenes and connection tests. Years of tech support taught me to fix problems before the audience sees them."
      },
      points: {
        it: ["Schema interattivo nella sezione Setup", "Configurazione da telefono o da computer", "Checklist prima della diretta"],
        en: ["Interactive diagram in the Setup section", "Phone or computer workflows", "Pre-show checklist"]
      },
      link: { href: "#setup", it: "Vedi lo schema", en: "See the diagram" }
    },
    {
      id: "this-site",
      roles: ["web"],
      year: "2026",
      status: "live",
      cover: { type: "code", label: "</>" },
      title: { it: "Questo portfolio", en: "This portfolio" },
      kicker: { it: "HTML, CSS e JavaScript", en: "HTML, CSS and JavaScript" },
      summary: {
        it: "Il sito che stai guardando: niente framework, bilingue, interattivo e leggero. Il codice è pubblico su GitHub.",
        en: "The site you are looking at: no frameworks, bilingual, interactive and lightweight. The code is public on GitHub."
      },
      points: {
        it: ["Timeline e color grading interattivi", "Ottimizzato per telefono", "Pubblicato con GitHub Pages"],
        en: ["Interactive timeline and colour grading", "Built for mobile", "Published with GitHub Pages"]
      },
      link: { href: "https://github.com/TKWAndre/Andrea-Albano-Portfolio", it: "Codice su GitHub", en: "Code on GitHub" }
    }
  ],

  /* Percorso: start/end sono anni con decimali (2023.25 = aprile 2023).
     end: null vuol dire "in corso". track: "work", "project" o "study". */
  timeline: [
    {
      track: "study", start: 2013.5, end: 2015.5, clipStart: 2009,
      title: { it: "Diploma tecnico", en: "Technical diploma" },
      org: "ITTL “Caio Duilio”, Messina",
      when: { it: "2009 – 2015", en: "2009 – 2015" },
      text: {
        it: "Istituto Tecnico Trasporti e Logistica. Il primo contatto serio con computer e tecnologie della comunicazione.",
        en: "Technical Institute of Transport and Logistics. My first serious contact with computers and communication technology."
      }
    },
    {
      track: "work", start: 2018.58, end: 2019.58,
      short: "Sales",
      title: { it: "Sales Assistant", en: "Sales Assistant" },
      org: "Fratelli Rossetti, Scalo Milano",
      when: { it: "ago 2018 – lug 2019", en: "Aug 2018 – Jul 2019" },
      text: {
        it: "Vendita, cassa, magazzino e report giornalieri. Qui ho imparato a leggere le persone in pochi secondi.",
        en: "Sales, till, stock and daily reports. This is where I learned to read people in seconds."
      }
    },
    {
      track: "work", start: 2019.8, end: 2023.16,
      title: { it: "Customer Care · Back Office", en: "Customer Care · Back Office" },
      org: "Mooney S.p.A., Milano",
      when: { it: "ott 2019 – feb 2023", en: "Oct 2019 – Feb 2023" },
      text: {
        it: "Back office nazionale: ticket tecnici, configurazione dei terminali, assistenza hardware e software, report sulle prestazioni.",
        en: "Nationwide back office: tech tickets, terminal configuration, hardware and software support, performance reports."
      }
    },
    {
      track: "work", start: 2023.26, end: 2026.57,
      title: { it: "Merchant Support Representative", en: "Merchant Support Representative" },
      org: "Satispay S.p.A., Milano",
      when: { it: "apr 2023 – lug 2026", en: "Apr 2023 – Jul 2026" },
      text: {
        it: "Onboarding e supporto agli esercenti su Freshdesk, attivazioni outbound, controlli di qualità e lavoro con il team prodotto.",
        en: "Merchant onboarding and support on Freshdesk, outbound activations, quality checks and work with the product team."
      }
    },
    {
      track: "study", start: 2024.2, end: 2024.32, cert: "assets/img/certs/english-80h.webp",
      short: "EN",
      title: { it: "Inglese professionale · 80 ore", en: "Professional English · 80 hours" },
      org: { it: "Corso di lingua", en: "Language course" },
      when: { it: "apr 2024", en: "Apr 2024" },
      text: {
        it: "Comunicazione professionale e grammatica per il lavoro.",
        en: "Professional communication and grammar for the workplace."
      }
    },
    {
      track: "study", start: 2025.4, end: 2025.56, cert: "assets/img/certs/learnn-web-development.webp",
      cert2: "assets/img/certs/boolean-fundamentals.webp",
      short: "Web",
      title: { it: "Web development", en: "Web development" },
      org: "Learnn · Boolean",
      when: { it: "lug 2025", en: "Jul 2025" },
      text: {
        it: "Due certificazioni: HTML, CSS, JavaScript, responsive design, Bootstrap e Git.",
        en: "Two certificates: HTML, CSS, JavaScript, responsive design, Bootstrap and Git."
      }
    },
    {
      track: "project", start: 2026.17, end: null,
      short: "GaiaCoords",
      title: { it: "Fondatore di GaiaCoords", en: "Founder of GaiaCoords" },
      org: "GaiaCoords",
      when: { it: "mar 2026 – oggi", en: "Mar 2026 – today" },
      text: {
        it: "Brand e-commerce di abbigliamento: sito, brand identity, SEO, social e clienti. Tutto fatto da me.",
        en: "E-commerce clothing brand: website, brand identity, SEO, social media and customers. All done by me."
      }
    },
    {
      track: "study", start: 2026.62, end: 2026.88,
      short: "SMM",
      title: { it: "Social Media Manager & Content Creator", en: "Social Media Manager & Content Creator" },
      org: "Corso promosso da MAW S.p.A., Milano",
      when: { it: "concluso nov 2026, con attestato", en: "completed Nov 2026, with certificate" },
      text: {
        it: "Strategia social, piano editoriale, creazione di contenuti e analisi dei risultati.",
        en: "Social strategy, editorial planning, content creation and performance analysis."
      }
    }
  ],

  /* Schema del setup: i nodi e le due modalità */
  setup: {
    nodes: {
      phone: {
        icon: "cam",
        title: { it: "iPhone 15", en: "iPhone 15" },
        role: { it: "Camera", en: "Camera" },
        text: {
          it: "Riprese in 4K, stabilizzate. Leggero da portare ovunque, anche in viaggio.",
          en: "Stabilised 4K footage. Light enough to carry anywhere, even on the road."
        }
      },
      mic: {
        icon: "mic",
        title: { it: "DJI Mic Mini", en: "DJI Mic Mini" },
        role: { it: "Audio", en: "Audio" },
        text: {
          it: "Microfono wireless collegato all'iPhone. Un video si perdona se è mosso, non se si sente male.",
          en: "Wireless mic connected to the iPhone. Viewers forgive shaky footage, never bad audio."
        }
      },
      mac: {
        icon: "desk",
        title: { it: "Mac mini M4", en: "Mac mini M4" },
        role: { it: "Regia", en: "Control room" },
        text: {
          it: "Il centro di tutto: scene, overlay e controllo dell'audio quando si va in diretta dal computer.",
          en: "The hub: scenes, overlays and audio control when going live from the computer."
        }
      },
      resolve: {
        icon: "cut",
        title: { it: "DaVinci Resolve", en: "DaVinci Resolve" },
        role: { it: "Montaggio", en: "Editing" },
        text: {
          it: "Taglio, color, audio e sottotitoli. Lo stesso girato diventa un video lungo e più short verticali.",
          en: "Cutting, colour, audio and subtitles. The same footage becomes a long video and several vertical shorts."
        }
      },
      out: {
        icon: "out",
        title: { it: "YouTube · Instagram · TikTok", en: "YouTube · Instagram · TikTok" },
        role: { it: "Pubblicazione", en: "Publishing" },
        text: {
          it: "Formato, copertina, titolo e orario giusti per ogni piattaforma.",
          en: "The right format, thumbnail, title and timing for each platform."
        }
      }
    },
    modes: {
      live: ["phone", "mic", "mac", "out"],
      rec: ["phone", "mic", "resolve", "out"]
    }
  }
};
