import { render } from 'solid-js/web'
import { App } from './components/App'
import { initializeIonicElements } from './ionic/initialize-elements'
import { app } from './states/app-state'

initializeIonicElements()
app.initialize()

render(() => <App />, document.body)
