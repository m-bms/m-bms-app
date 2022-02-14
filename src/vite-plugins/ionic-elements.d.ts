type InitializeIonic = typeof import('@ionic/core/components')['initialize']
type IonicConfig = Parameters<InitializeIonic>[0]

declare module 'virtual:ionic-elements' {
  export const initializeIonicElements: (config?: IonicConfig) => void
}
