/**
 * Usage:
 *  1. Set the mode through the environment variable `MODE`
 *  2. Use comment `// @mode: <MODE_NAME>`
 *  3. The line bellow the comment will be commented out if `MODE_NAME != MODE`
 */

import { Plugin } from 'vite'

const { MODE } = process.env

const regex = /^( *\/\/\ *@mode: *)(.*)(\n *)(.*)$/gm

export const pluginStripMode = (): Plugin => ({
  name: 'strip-mode',
  enforce: 'pre',
  transform(ctx) {
    return ctx.replaceAll(regex, (match, pre1, mode, pre2, line) => {
      return mode === MODE ? match : pre1 + mode + pre2 + '// ' + line
    })
  },
})
