import { batch } from 'solid-js'
import { createMutable } from 'solid-js/store'

export type MutableState<T> = {
  -readonly [K in keyof T]: T[K] extends readonly [...args: infer U] ? U : T[K]
}

export function assumeMutableState<T>(
  value: T
  // @ts-ignore
): asserts value is MutableState<T> {}

export const createState = <T extends Record<string, unknown>>(
  state: MutableState<T>
) => {
  for (const key in state) {
    const prop = Object.getOwnPropertyDescriptor(state, key)!
    const method = prop.set ?? (typeof prop.value === 'function' && prop.value)
    if (!method) continue

    Object.defineProperty(state, key, {
      [prop.set ? 'set' : 'value'](...args: unknown[]) {
        return batch(method.bind(this, ...args))
      },
    })
  }

  return createMutable(state) as T
}
