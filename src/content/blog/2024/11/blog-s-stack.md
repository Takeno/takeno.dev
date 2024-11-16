---
title: This blog's stack
description: A summary of the choices made to create this blog. And yes, I've decided to use AI this time.
pubDate: 2024-11-10
lang: en
translationOf: '2024/11/lo-stack-di-questo-blog'
---

Like many of you, I'm a software engineer: I appreciate things that are automated, streamlined, and easily updated. But when it comes to working on your blog, you can easily get lost in the maze of technologies, diverse features, and the latest graphic trends.

For the past couple of years, I've been toying with the idea of starting this blog. Over time, I've been slowly gathering ideas for content and pragmatic requirements: a static blog, markdown articles that can be quickly transferred from Obsidian, and a minimal layout that puts the focus on the content.

Ultimately, I opted for Astro, Tailwind, and Cursor AI.

## Astro & Tailwind

Initially, I considered using [Nextra](https://nextra.site), a framework for generating content sites based on Next.js, which has already been used as a foundation for [various web documentation](https://nextra.site/showcase), such as [SWR](https://swr.vercel.app) or [GraphQL](https://graphql.org). While it may seem tailored to documentation, it also offers a template designed for content sites and blogs.

I've already utilized it in a Knowledge Base side project and found it to be a good fit, but ultimately, I felt it was best suited for applications where design isn't a primary focus. While my site might not be a candidate for the [Awwwards](https://www.awwwards.com/), rewriting the basic template would not have made it stand out from any other SSG + MDX.

In the end, I decided to give [Astro](https://astro.build) a try. It's still trendy, but also stable now. I've tried Gatsby before, but unfortunately, I regretted it in the long run. I've never brought it to production, despite playing around with some pull requests for the [RomaJS](https://github.com/Roma-JS/roma-js-on-astro/) site.

For the style, I opted for Tailwind, as I've become quite familiar with its quick writing and refactoring of utility classes into their own classes. Plus, it aligns well with the next point.

## Cursor AI

One of the main reasons I delayed creating my site was simply laziness. When it comes to personal projects, I'm heavily influenced by _hype-driven development_. I dive headfirst into the most exciting and stimulating challenges, but then throw in the towel when it comes to finishing the more monotonous and boring tasks. It all starts as a personal challenge, but once it's solved, the fuel runs out.

I was on the train back from [React.js Day](https://2024.reactjsday.it/) in Verona, when I stumbled upon yet another post/video about generative AI applied to code. Among the various solutions of the moment (including a promising new update of [v0](https://v0.dev)), the name of this [Cursor](https://cursor.com), a VSCode fork integrated with AI, emerged once again.
In this post/video, we experimented with creating a web application solely through prompts. What sets Cursor apart from other solutions I've tried is its ability to suggest changes directly to the codebase, guiding you on which files to create and what edits to make to existing ones. In the end, I thought to myself: _if it's truly that effective in making changes across multiple files, maybe it's time to start my blog._ Spoiler: If you're reading this, it means it worked.

As mentioned, I had already tried some VSCode extensions like [Codeium](https://codeium.com) (always in its free version at the time), but ultimately, the only real satisfaction I had was with small tasks and some autocomplete. I probably never bothered to properly configure the necessary context, but in the _simplified_ use, I didn't achieve anything truly impactful. From the videos I've seen, Cursor seemed to have an edge right from the start.

I started with a simple `pnpm create astro@latest` command, then wrote a `doc.md` file where I listed things like the tech stack, the blog's goal, and the theme colors. I then asked it to create and evolve the various pages for me.

> Based on the @doc.md specifications, it generates the home page of my blog. The logo can be found in public/logo.png.

And from this simple prompt (yes, I'm tired of overly detailed prompts too), it started creating files and content:

![Cursor output](/blog-contents/2024-11-cursor.png)

With a clear goal in mind, I spent a couple of hours iterating like this. I'm sharing this second example because I think it's significant: I wanted to create a blog in both Italian and English, so I needed both /index.astro and /en/index.astro for the home page.
I wanted to modify only the textual part and keep the rest of the structure intact, so I requested a simple refactoring.

Move the contents of index.astro into components/pages/home.astro and replace all literal strings with externally provided props.
In index.astro, utilize the new component, and in en/index.astro, employ the same component with the translated texts.

And there you have it!

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

It was no big deal, but within 20 seconds, I had the two pages cleaned up, using a single shared component and all the text passed through props.

> Let's transform the menu into a responsive one, which on mobile devices becomes a classic burger menu.

_As I revisited the prompts while writing this article, I realized that at a certain point, I started using 'WE' as a verbal person..._

What really got me wrong was the eslint/prettier configuration. It mixed up the configurations of different versions, none of which were recent. After spending 20 minutes trying to fix them, I found it quicker to delete everything and start from scratch by hand.

### Final Thoughts on Cursor

If I'm online with this blog, I owe it to Cursor and claude-3.5-sonnet for taking on the tedious tasks that I find boring.

When it comes to UI, everything is pretty good. I encountered a few unnecessary classes and some questionable stylistic choices, but overall, nothing that a skilled expert couldn't fix with a quick glance at the code.

On the application logic side, I've done very little (thankfully, it's an SSG), so I haven't had the chance to test for logical errors yet. However, I must emphasize that the ability to work on multiple files simultaneously provides a distinct advantage, surpassing the simple autocomplete feature while writing.

At least, this is my experience as a senior engineer who employs these tools to expedite the more tedious aspects. However, I also possess the critical eye to comprehend what I've written and, if necessary, correct it on the fly. In the hands of less experienced developers, I fear that it may result in code going into production that is not fully understood.

I'll keep testing it on some side projects to see how it performs, but most importantly, to see how it boosts my productivity.
In any case, locating and fixing the bug introduced by the AI is still a valuable exercise.

# Design

On the UX side, I had a clear vision of the blog I wanted to create (streamlined, single-column, easy to read for my limited writing). On the UI side, I had an even smoother path thanks to the extensive branding work done two years ago by my partner [Marco Cinti](https://www.linkedin.com/in/marco-cinti-ceo-impronta/).

The initial plan was to design the graphics for the [Twitch](https://twitch.tv/takenodev) channel, but it turned out to be just as effective in establishing a visual identity for the site. When it comes to creativity, no AI can match it.
