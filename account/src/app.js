import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import About from './containers/about'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/account" component={About} />
      </Switch>
    </Router>
  )
}

export default App
