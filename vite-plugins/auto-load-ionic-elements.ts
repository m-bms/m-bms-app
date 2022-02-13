import { pascalCase } from 'change-case'
import { Plugin } from 'vite'

const regex = /<(ion-[a-z-]+)/g

export const pluginAutoLoadIonicElements = (): Plugin => ({
  name: 'auto-load-ionic-elements',
  transform(code, id) {
    if (!/\.tsx$/.test(id)) return

    const elements = [
      ...new Set([...code.matchAll(regex)].map(([_, element]) => element)),
    ]
    if (!elements.length) return

    const imports = elements.map(
      element =>
        `import { defineCustomElement as define${pascalCase(element)} } ` +
        `from '@ionic/core/components/${element}'`
    )
    const defines = elements.map(element => `define${pascalCase(element)}()`)

    return [...imports, ...defines, code].join('\n')
  },
})
