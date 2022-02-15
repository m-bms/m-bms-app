import { pascalCase } from 'change-case'
import fs from 'fs'
import path from 'path'
import { Plugin } from 'vite'

const DEFINE_ELEMENTS_NAME = 'define-elements.ts'
const DEFINE_ELEMENTS_FILE = path.join(__dirname, DEFINE_ELEMENTS_NAME)

const REGEX = /(?<=<)ion-[a-z-]+/g

const toIgnores = ['ion-icon']
const relateds = {
  'ion-select': ['ion-alert', 'ion-action-sheet', 'ion-popover'],
} as const

const update = (elements: Set<string>) => {
  Object.entries(relateds).forEach(([element, relateds]) => {
    if (!elements.has(element)) return
    relateds.forEach(related => elements.add(related))
  })

  const toUpdates = [...elements].sort()
  const importings: string[] = []
  const definings: string[] = []

  toUpdates.forEach(element => {
    const defining = `define${pascalCase(element)}`
    const importing = `import { defineCustomElement as ${defining} }`
    const from = `from '@ionic/core/components/${element}'`

    importings.push(`${importing} ${from}`)
    definings.push(`  ${defining}()`)
  })

  const code = [
    ...importings,
    '\nexport const defineElements = () => {',
    ...definings,
    '}\n',
  ].join('\n')

  fs.writeFileSync(DEFINE_ELEMENTS_FILE, code)
}

export const pluginIonicElements = (): Plugin => {
  const elements = new Set<string>()
  let updateScheduled = false

  return {
    name: 'ionic-elements',
    enforce: 'post',
    transform(code, id) {
      if (!/\.tsx$/.test(id)) return null

      let elementCount = elements.size
      Array.from(code.matchAll(REGEX)).forEach(([element]) => {
        if (toIgnores.includes(element)) return
        elements.add(element)
      })
      if (elements.size === elementCount || updateScheduled) return

      updateScheduled = true
      setTimeout(() => {
        updateScheduled = false
        update(elements)
      })
    },
  }
}
