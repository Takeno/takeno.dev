---
title: Lo stack di questo blog
description: Un resoconto delle scelte prese per tirare su questo blog. E sì, questa volta ho usato l'AI.
pubDate: 2024-11-10
lang: it
translationOf: '2024/11/blog-s-stack'
---

Probabilmente come voi, sono un software engineer: mi piacciono le cose automatizzate, snelle, aggiornabili con poco effort. Ma quando si tratta di mettere mani sul proprio blog, alla fine si finisce per perdersi nel labirinto delle tecnologie, delle funzionalità più disparate, dell'ultima peculiarità grafica.

Da un paio d'anni girava l'idea di aprire questo blog, per cui nel tempo ho lentamente accumulato idee per i contenuti così come quelli che potevano essere dei requisiti pragmatici: blog statico, articoli in markdown da poter riversare velocemente da Obsidian, layout minimal con il contenuto al centro dell'attenzione.

Alla fine la mia scelta è andata su Astro, Tailwind e Cursor AI.

## Astro & Tailwind

In una primo momento, tra le varie soluzioni SSG avevo ipotizzato di utilizzare [Nextra](https://nextra.site): un framework per la generazione di siti di contenuto basato su Next.js, già utilizzato come base per [diverse documentazioni](https://nextra.site/showcase) web come [SWR](https://swr.vercel.app) o [GraphQL](https://graphql.org). Sebbene sembri specifico per documentazioni, ha anche un template più orientato a siti di contenuto e blog.

L'ho già usato su un side project di tipo Knowledge Base e mi ci ero trovato bene, ma alla fine ho ritenuto che trovasse la sua massima applicazione dove il design non è una componente primaria. Non che il mio sito dovesse essere menzionato agli [Awwwards](https://www.awwwards.com/), ma se avessi dovuto comunque riscrivermi il template base allora non sarebbe stato tanto diverso da un altro SSG + MDX.

Alla fine ho deciso di provare [Astro](https://astro.build), perché... perché è ancora di tendenza ma anche ormai stabile; perché Gatsby l'ho già provato in passato e alla lunga purtroppo me ne sono pentito; perché non l'avevo ancora mai portato in produzione, nonostante ci avessi giocato un po' con qualche pull request per il sito del [RomaJS](https://github.com/Roma-JS/roma-js-on-astro/).

Per lo stile sono andato tranquillo su Tailwind, in quanto ormai ci ho preso buona dimestichezza nello scrivere velocemente e nel rifattorizzare le classi di utility in classi proprie.. e poi si sposava bene con il prossimo punto

## Cursor AI

Uno dei motivi per cui ho a lungo rimandato la creazione del mio sito è stato principalmente per la pigrizia. Sui progetti personali sono molto guidato dal _hype-driven development_: mi getto a capofitto sulle sfide più entusiasmanti e stimolanti e poi getto la spugna quando si tratta di finire le cose più monotone e noiose. Parte sempre tutto come una sfida personale, fatto salvo poi che una volta risolta finisce il carburante.

Ero sul treno di ritorno dal [React.js Day](https://2024.reactjsday.it/) di Verona, quando saltando da un contenuto a l'altro, da LinkedIn a YouTube, mi imbatto nell'ennesimo post/video riguardante l'AI generativa applicata al codice e tra le varie soluzioni del momento (tra cui un nuovo promettente aggiornamento di [v0](https://v0.dev)) esce fuori di nuovo il nome di questo [Cursor](https://cursor.com), un fork VSCode integrato con l'AI.
In questo post/video si facevano un po' di esperimenti su come generare un'applicazione web soltanto attraverso dei prompt. La cosa interessante di Cursor, rispetto ad altre soluzioni che avevo provato, è che propone le modifiche direttamente sulla codebase, suggerendoti quali file creare e quali modifiche apportare ai file esistenti. Alla fine mi sono detto: _se è effettivamente così efficace sull'applicare modifiche su più file, forse è la volta buona che apro il mio blog_. Spoiler: se state leggendo questo articoli, significa che ha funzionato.

Come detto, avevo già provato qualche estensione di VSCode come [Codeium](https://codeium.com) (sempre nella sua versione gratuita al momento), ma alla fine l'unica seria soddisfazione l'avevo ottenuta su piccoli task e qualche autocomplete. Probabilmente non mi sono mai sbattuto nel configurare bene il contesto necessario, ma nell'uso _semplificato_ non avevo ottenuto nulla di veramente impattante. Su questo, dai video visti Cursor sembrava avere una marcia in più fin dalla prima installazione.

Sono partito dal semplice `pnpm create astro@latest` fatto a mano, ho scritto un `doc.md` dove ho messo in semplici elenchi puntati cose tipo lo stack tecnologico, l'obiettivo del blog, le colorazioni del tema, e ho cominciato a chiedergli di crearmi ed evolvermi le varie pagine.

> sulla base delle specifiche @doc.md, genera la home page del mio blog. Il logo è dentro public/logo.png

E da questo banalissimo prompt (sì, mi stufo anche di dare prompt troppo dettagliati), ha cominciato a creare file e contenuti:

![Cursor output](/blog-contents/2024-11-cursor.png)

Avendo bene in mente cosa volevo ottenere, ho iterato così per un paio d'ore. Riporto questo secondo esempio perché secondo me significativo: avevo deciso di avere il blog sia in italiano che in inglese, per cui della home page avevo bisogno sia di /index.astro che di /en/index.astro.
Volendo cambiare solo la parte testuale e avere il resto della struttura comune, ho chiesto un semplice refactoring:

> Sposta il contenuto di index.astro dentro components/pages/home.astro e sostituisci tutte le stringhe letterali in props fornite esternamente.
> In index.astro usa il nuovo componente e in en/index.astro usa lo stesso componente con i testi tradotti

Et voilà!

```ts
import { Image } from 'astro:assets';
import FormattedDate from '../FormattedDate.astro';

interface Props {
  title: string;
  greeting: string;
  subtitle: string;
  bio: string;
  currentTech: string;
  recentPostsTitle: string;
  readMoreText: string;
  readAllText: string;
  upcomingTalksTitle: string;
  viewAllTalksText: string;
  conferenceName: string;
  conferenceDate: string;
}

const {
  title,
  greeting,
  subtitle,
  bio,
  currentTech,
  recentPostsTitle,
  readMoreText,
  readAllText,
  upcomingTalksTitle,
  viewAllTalksText,
  conferenceName,
  conferenceDate,
} = Astro.props;
```

Nulla di sconvolgente, ma nel giro di 20 secondi avevo le due pagine ripulite, che usavano un componente unico comune e tutti i testi passati via props.

> Trasformiamo il menu in uno responsive che su mobile diventa un classico burger menù

_Ripescando i prompt scrivendo questo articolo, mi sono accorto che ad un certo punto ho cominciato ad usare il NOI come persona verbale..._

Quello che invece mi ha totalmente sbagliato è stata la configurazione di eslint/prettier. Ha mischiato le configurazioni di versioni differenti, per nulla recenti, e dopo 20 minuti passati provando a sistemarle ho fatto prima ad eliminare tutto e rifarla da zero a mano.

### Considerazioni finali su Cursor

Se sono online con questo blog, devo ringraziare Cursor e claude-3.5-sonnet per aver fatto la parte di manovalanza che mi annoia.

Finché si tratta di UI tutto abbastanza bene. Mi sono trovato un po' di classi di troppo, un po' di _scelte_ stilistiche discutibili, ma tutto sommato nulla che un'abile mano esperta non sistema con una brevissima occhiata sul codice.

Lato logica applicativa ho fatto ben poco (fortunatamente, è un SSG), quindi non ho avuto ancora modo di testare errori logici. Però devo sostenere che la possibilità di agire su più file contemporaneamente gli da quella marcia in più totalmente diversa dal semplice autocomplete mentre uno scrive.

Queste almeno la mia esperienza da senior engineer che utilizza questo tipo di strumenti per velocizzare le parti noiose, ma ha anche l'occhio critico di capire cosa ha scritto e nel caso di correggerlo in corsa. Nelle mani di sviluppatori meno esperti, il timore che diventi qualcosa che vada in produzione codice _non compreso_ mi lascia perplesso.

Continuerò a provarlo su qualche side project per vedere come se la cava lui, ma soprattutto per vedere come aumenta la mia produttività. <br />
E comunque, trovare il bug introdotto dall'IA e fixarlo è comunque un allentamento.

# Design

Se dal lato UX avevo le idee chiare sulla tipologia di blog che volevo (snello, mono colonna, di facile lettura per quel poco che scrivo), lato UI avevo la strada ancora più spianata grazie ad un enorme lavoro di branding già fatto due anni fa dal mio socio [Marco Cinti](https://www.linkedin.com/in/marco-cinti-ceo-impronta/).

L'idea iniziale era per preparare la grafica del canale [Twitch](https://twitch.tv/takenodev) ma si è rivelata altrettanto efficace per dare un'identità grafica al sito. Sul tocco creativo, non c'è AI che tenga.
