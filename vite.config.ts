import { defineConfig } from 'vite'
import pluginReact from '@vitejs/plugin-react'
import pluginIcons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginIcons({
      compiler: 'jsx',
      jsx: 'react',
    }),
  ],
})
