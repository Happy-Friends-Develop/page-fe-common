import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',

  integrations: [react()],
  site: 'https://creativetimofficial.github.io',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', 
          silenceDeprecations: ['legacy-js-api', 'mixed-decls', 'color-functions', 'global-builtin', 'import'],
        },
      },
    },
  },

  adapter: node({
    mode: 'standalone',
  }),
});