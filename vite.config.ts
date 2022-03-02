import pluginReact from "@vitejs/plugin-react";
import pluginIcons from "unplugin-icons/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [pluginReact(), pluginIcons()],
});
