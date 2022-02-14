import { render } from 'solid-js/web'
import { initializeIonicElements } from 'virtual:ionic-elements'
import { App } from './components/App'

initializeIonicElements()

render(() => <App />, document.body)
