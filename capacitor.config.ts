import { CapacitorConfig } from "@capacitor/cli";
import ip from "ip";

const DEV = process.env.NODE_ENV === "dev";
const VITE_DIR = "dist";
const VITE_PORT = 3000;

const config: CapacitorConfig = {
  appId: "com.mermaidbms.app",
  appName: "Mermaid BMS",
  webDir: VITE_DIR,
};

if (DEV) {
  const url = process.env.URL || `${ip.address()}:${VITE_PORT}`;

  config.server = {
    url,
    cleartext: true,
  };
}

export default config;
