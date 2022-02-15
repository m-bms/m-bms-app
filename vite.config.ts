import { defineConfig } from 'vite'
import pluginSolid from 'vite-plugin-solid'
import { pluginIonicElements } from './src/ionic/vite-plugin-elements'

export default defineConfig({
  plugins: [pluginIonicElements(), pluginSolid()],
})
