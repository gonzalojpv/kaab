import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  plugins: [HstVue()],
  setupFile: 'src/histoire.setup.ts',

  // If you intend to serve from a subdirectory...
  vite: {
    base: '/ui-library/',
  },
})
