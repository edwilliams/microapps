import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import MicroApp from './micro-app'
import Dashboard from './containers/dashboard'

const App = () => {
  // NB all microapp routes below are copied from `{microapp}/src/app.js`
  return (
    <Router>
      <React.Fragment>
        <main>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route
              exact
              path="/account"
              component={() => (
                <MicroApp name="Account" scriptName="microapp-account.min.js" />
              )}
            />
          </Switch>
        </main>
      </React.Fragment>
    </Router>
  )
}

export default App
