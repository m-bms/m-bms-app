import { subscribe } from 'valtio'
import { subscribeKey } from 'valtio/utils'

const saveFuncs = new Map<string, Function>()

export const setupLocal = <T extends Record<string, unknown>>(
  key: string,
  state: T,
  ...props: (keyof T)[]
) => {
  props = [...new Set(props)]

  const saveLocal = () => {
    let local = {} as Partial<T>

    if (!props.length) local = state
    else props.forEach(prop => (local[prop] = state[prop]))

    localStorage.setItem(key, JSON.stringify(local))
  }

  if (saveFuncs.has(key)) throw Error(`Key existed [${key}]`)
  saveFuncs.set(key, saveLocal)

  const stringified = localStorage.getItem(key)
  if (!stringified) saveLocal()
  else Object.assign(state, JSON.parse(stringified))

  if (!props.length) subscribe(state, saveLocal)
  else props.forEach(prop => subscribeKey(state, prop, saveLocal))
}

export const resetLocals = () => {
  saveFuncs.forEach(save => save())
}
