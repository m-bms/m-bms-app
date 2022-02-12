import { defineConfig } from 'vite'
import pluginSolid from 'vite-plugin-solid'
import { pluginStripMode } from './vite/pluginStripMode'

export default defineConfig({
  plugins: [pluginStripMode(), pluginSolid()],
})
