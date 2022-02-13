import { defineConfig } from 'vite'
import pluginSolid from 'vite-plugin-solid'
import { pluginAutoLoadIonicElements } from './vite-plugins/auto-load-ionic-elements'
import { pluginStripMode } from './vite-plugins/strip-mode'

export default defineConfig({
  plugins: [pluginStripMode(), pluginAutoLoadIonicElements(), pluginSolid()],
})
