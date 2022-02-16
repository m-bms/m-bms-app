declare global {
  interface ImportMetaEnv {
    readonly VITE_RELEASE?: 'true'
  }
}

export const isRelease = () => import.meta.env.VITE_BUILD === 'true'

export const isDev = () => import.meta.env.DEV
