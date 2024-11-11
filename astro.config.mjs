// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://takeno.dev',
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'it',
        locales: {
          en: 'en-US',
          it: 'it-IT',
        },
      },
    }),
    tailwind(),
  ],
  i18n: {
    locales: ['en', 'it'],
    defaultLocale: 'it',
  },
  experimental: {
    contentLayer: true,
  },
});
