import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import UnpluginAutoInstall from '../src/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    UnpluginAutoInstall(),
  ],
})
