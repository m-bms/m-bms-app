import { render } from 'solid-js/web'
import { App } from './components/App'
import { initializeIonicElements } from './utils/ionic'

initializeIonicElements()

render(() => <App />, document.body)
