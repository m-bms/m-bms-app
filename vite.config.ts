import pluginReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

process.env.VITE_APP_VERSION = process.env.npm_package_version

export default defineConfig({
  plugins: [pluginReact()],
})
