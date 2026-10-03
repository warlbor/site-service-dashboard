import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages project sites (/repo-name/)
  base: process.env.GITHUB_PAGES ? '/site-service-dashboard/' : '/',
  server: { port: 5173, open: false },
})
