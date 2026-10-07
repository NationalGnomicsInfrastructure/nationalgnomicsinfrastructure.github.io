import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nationalgnomicsinfrastructure.github.io',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    build: {
      // Keep page scripts as external files so CSP script-src 'self' holds.
      assetsInlineLimit: 0,
    },
  },
});
