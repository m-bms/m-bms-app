/**
 * Usage:
 *  1. `import { initializeIonicElements } from 'virtual:ionic-elements'`
 *  2. In TSX files, if `<ion-{ELEMENT}` is found, then `ELEMENT` will
 *    be included during the virtual function `initializeIonicElements()`
 */

import { JSX as IonicJSX } from '@ionic/core'
import { pascalCase } from 'change-case'
import { JSX as IoniconJSX } from 'ionicons'
import { JSX } from 'solid-js'
import { Plugin } from 'vite'
import pluginVirtual, { updateVirtualModule } from 'vite-plugin-virtual'
import { PascalToCamel, PascalToKebab } from '../utils/common'

const moduleId = 'virtual:ionic-elements'
const regex = /(?<=<)ion-[a-z-]+/g
const relatedElements = {
  'ion-select': ['ion-alert', 'ion-action-sheet', 'ion-popover'],
} as const

const createModuleCode = (elements: Set<string>) => {
  Object.entries(relatedElements).forEach(([element, relateds]) => {
    if (!elements.has(element)) return
    relateds.forEach(related => elements.add(related))
  })

  const importings: string[] = []
  const definings: string[] = []

  elements.forEach(element => {
    const identifier = `define${pascalCase(element)}`
    const importing = `import { defineCustomElement as ${identifier} }`
    const from = `from '@ionic/core/components/${element}'`
    const defining = `  ${identifier}()`

    importings.push(`${importing} ${from}`)
    definings.push(defining)
  })

  return [
    `import '@ionic/core/css/ionic.bundle.css'`,
    `import { initialize } from '@ionic/core/components'`,
    ...importings,
    'export const initializeIonicElements = (...args) => {',
    '  initialize(...args)',
    ...definings,
    // https://github.com/ionic-team/ionic-docs/issues/2105
    `  document.documentElement.classList.add('ion-ce')`,
    '}',
  ].join('\n')
}

// TODO: provide source map
export const pluginIonicElements = (): Plugin[] => {
  const elements = new Set<string>()
  const virtual = pluginVirtual({
    [moduleId]: createModuleCode(elements),
  })

  return [
    virtual,
    {
      name: 'ionic-elements',
      transform(code, id) {
        if (/\.tsx$/.test(id)) {
          Array.from(code.matchAll(regex)).forEach(([element]) => {
            elements.add(element)
          })

          setTimeout(() =>
            updateVirtualModule(virtual, moduleId, createModuleCode(elements))
          )
        }

        return code
      },
    },
  ]
}

type IonicElementKey<T> = T extends `on${infer U}`
  ? `on:${PascalToCamel<U>}`
  : PascalToKebab<T>

type IonicElement<T> = {
  [K in keyof T as IonicElementKey<K>]: T[K]
} & {
  slot?: string
  class?: string
  children?: JSX.Element
}

type IonicElements<
  T = IonicJSX.IntrinsicElements & IoniconJSX.IntrinsicElements
> = {
  [K in keyof T]: IonicElement<T[K]>
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements extends IonicElements {}
  }
}
