/**
 * Usage:
 *  1. Set the mode through environment variable `MODE=<NAME>`
 *  2. Use comment `// @mode: <name>`
 *  3. The line bellow the comment will be commented out if `name != NAME`
 */

import { Plugin } from 'vite'

const { MODE } = process.env
const regex = /^( *\/\/\ *@mode: *)(.*)(\n *)(.*)$/gm

// TODO: provide source map
export const pluginStripMode = (): Plugin => ({
  name: 'strip-mode',
  transform(code, id) {
    if (!/\.tsx?$/.test(id)) return

    return code.replaceAll(regex, (match, pre1, mode, pre2, line) => {
      return mode === MODE ? match : pre1 + mode + pre2 + '// ' + line
    })
  },
})
