import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Dashboard from './containers/dashboard'
import MicroFrontend from './micro-frontend'

const Account = () => (
  <MicroFrontend name="Account" scriptName="microapp-account.min.js" />
)

const App = () => {
  // NB all microapp routes are copied from `{microapp}/src/app.js`
  return (
    <Router>
      <React.Fragment>
        <main>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/account" component={Account} />
          </Switch>
        </main>
      </React.Fragment>
    </Router>
  )
}

export default App
