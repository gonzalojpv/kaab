/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom', // or happy-dom ???
    globals: true,
    setupFiles: [path.resolve(__dirname, 'test/setup.ts')]
  },
  plugins: [
    vue(),
    checker({
      // e.g. use TypeScript check
      typescript: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src')
    }
  }
})
