import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  site: 'https://danielaugland.github.io',
  base: '/cookbook-main',
  integrations: [
    preact({ compat: false }),
    AstroPWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My Cookbook',
        short_name: 'Cookbook',
        description: 'A personal recipe cookbook',
        theme_color: '#ffffff',
        background_color: '#faf9f7',
        display: 'standalone',
        icons: [
          {
            src: '/cookbook-main/icons/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{html,css,js,svg,webp,png,woff2}'],
      },
    }),
  ],
});
