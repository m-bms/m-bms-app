import { pascalCase } from 'change-case'
import { Plugin } from 'vite'

const regex = /(?<=<)ion-[a-z-]+/g

// TODO: provide source map
export const pluginIonicElements = (): Plugin => ({
  name: 'ionic-elements',
  transform(code, id) {
    if (!/\.tsx$/.test(id)) return

    const elements = new Set([...code.matchAll(regex)].flat())

    elements.forEach(element => {
      const define = `define${pascalCase(element)}`
      const importing = `import { defineCustomElement as ${define} }`
      const from = `from '@ionic/core/components/${element}'`
      const defining = `${define}()`

      code = `${importing} ${from}\n${defining}\n${code}`
    })

    return code
  },
})
