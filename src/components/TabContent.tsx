import { createEffect, JSX, untrack } from 'solid-js'
import { app } from '../states/app-state'
import { info } from '../utils/logger'

export const TabContent = (props: {
  name: string
  children?: JSX.Element
  onEnter?(): void
  onLeave?(): void
}) => {
  createEffect(wasActive => {
    const { selectedTab } = app

    return untrack(() => {
      if (!selectedTab) return

      if (selectedTab === props.name) {
        info(`Tab enter [${props.name}]`)
        props.onEnter?.()
        return true
      } else if (wasActive) {
        info(`Tab leave [${props.name}]`)
        props.onLeave?.()
      }
    })
  })

  return <>{props.children}</>
}
