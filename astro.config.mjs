// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://vkcsystems.com',
  output: 'static',
  adapter: vercel(),
  security: {
    checkOrigin: false,
  },
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap({
    filter: (page) => !page.includes('/privacy') && !page.includes('/thank-you'),
  })]
});