import { isDev } from './env'

export const info = (...messages: string[]) => {
  if (isDev()) console.info('[info]', ...messages)
}
