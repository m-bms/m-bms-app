import { defineConfig } from 'vite'
import pluginSolid from 'vite-plugin-solid'
import { pluginIonicElements } from './vite-plugins/ionic-elements'
import { pluginStripMode } from './vite-plugins/strip-mode'

export default defineConfig({
  plugins: [pluginStripMode(), pluginIonicElements(), pluginSolid()],
})
