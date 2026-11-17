import { defineConfig } from 'astro/config';

// The site is a GitHub Pages user site, so it is served from the domain root.
export default defineConfig({
  site: 'https://shawn-phy.github.io',
  server: { host: '127.0.0.1', port: 4321 },
});
