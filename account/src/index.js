import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

window.renderAccount = containerId => {
  ReactDOM.render(<App />, document.getElementById(containerId))
}

window.unmountAccount = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId))
}
