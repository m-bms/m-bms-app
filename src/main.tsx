import { render } from 'solid-js/web'
import { App } from './components/App'
import { initializeIonicElements } from './ionic/initialize-elements'

initializeIonicElements()

render(() => <App />, document.body)
