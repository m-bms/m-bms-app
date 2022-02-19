import '@ionic/react/css/ionic.bundle.css'
import ReactDom from 'react-dom'
import { App } from './components/App'
import { findDevice } from './components/FindDevice.state'
import { settings } from './components/Settings.state'
import './main.scss'

findDevice.setup()
settings.setup()

ReactDom.render(<App />, document.getElementById('app'))
