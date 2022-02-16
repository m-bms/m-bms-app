import { customElement, noShadowDOM } from 'solid-element'
import { JSX } from 'solid-js'

export const defineElement = <T>(
  tag: string,
  render: (props: T) => JSX.Element
) => {
  customElement(tag, (props: T) => {
    noShadowDOM()
    return render(props)
  })

  return tag
}
