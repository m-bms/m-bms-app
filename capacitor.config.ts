import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.mermaidbms.app",
  appName: "Mermaid BMS",
  webDir: "dist",
  server: {
    url: "192.168.0.22:3000",
    cleartext: true,
  },
};

export default config;
