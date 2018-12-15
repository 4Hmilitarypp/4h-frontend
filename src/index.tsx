import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './assets/styles/index.css'
import './assets/styles/reset.css'
import api from './utils/api'
// import registerServiceWorker from './registerServicesWorker'

api.init()
ReactDOM.render(<App />, document.getElementById('root'))
// registerServiceWorker()
