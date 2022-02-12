import { render } from 'solid-js/web'
import { App } from './components/App'
import { defineIonicElements } from './utils/ionic'

defineIonicElements()

render(() => <App />, document.body)
