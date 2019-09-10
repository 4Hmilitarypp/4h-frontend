import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'react-app-polyfill/ie11'

import * as Sentry from '@sentry/browser'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './assets/styles/reset.css'
import * as serviceWorker from './serviceWorker'
import api from './utils/api'

api.init()
Sentry.init({
  dsn: 'https://b748e0617aa04cb094dee4b3ecd90a19@sentry.io/1446984',
})

ReactDOM.render(<App />, document.getElementById('root'))
if (process.env.NODE_ENV === 'production') {
  serviceWorker.register()
} else {
  serviceWorker.unregister()
}
