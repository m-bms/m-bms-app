declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_VERSION: string
  }
}

export const appVersion = import.meta.env.VITE_APP_VERSION
