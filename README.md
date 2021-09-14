## MicroApp App / MicroApps

---

### MicroApps - Why?

The rationale behind MicroApps is:

- Cordova / Deployment: Only need to submit the “Parent App” to App Stores (the MicroApp’s are loaded dynamically)
- Testing: QA can test the updated MicroApp in the knowledge the Parent App has not been modified
- Performance: Assets loaded dynamically as needed
- Smaller bundles: multiple MicroApp bundles as opposed to single Monolith bundle
- Independent deployment: Reduce the scope of any given deployment and in turn reduce the associated risk
- Autonomous teams: Separate developers working on separate MicroApps (....MicroApps could even be written in different languages!)
- Encourage good practice / separation of concerns: e.g. Schedule specific assets in Schedule MicroApp only. Shared assets treated as such

---

### MicroApps - How? (_contrived run time example_)

```html
<body>
  <!-- These scripts don't render anything immediately -->
  <!-- Instead they attach entry-point functions to `window` -->
  <script src="http://example.com/app.min.js"></script>
  <script src="http://example.com/account.min.js"></script>
  <script src="http://example.com/messages.min.js"></script>

  <div id="micro-frontend-root"></div>

  <script type="text/javascript">
    // These global functions are attached to window by the above scripts
    const microFrontendsByRoute = {
      '/': window.renderHome,
      '/account': window.renderHotwater,
      '/messages': window.renderMessages
    }
    const renderFunction = microFrontendsByRoute[window.location.pathname]

    // Having determined the entry-point function, we now call it,
    // giving it the ID of the element where it should render itself
    renderFunction('micro-frontend-root')
  </script>
</body>
```

---

### Getting Started

**Development**

- `npm install`
- `npm start`

**Production**

- `npm run build`
- serve the `dist` folder for app / microapps
- serve the `dashboard` folder to demo microapps individually

---

### Commands

The following commands can be executed in the root folder (e.g. npm run start:app)

- `start`: Runs the main "parent" App
- `start:account`: Runs the Account MicroApp
- `build:dist`: Builds the folder that gets deployed
- `build:dashboard`: Builds the MicroApp Dashboard (for QA / internal)
- `build`: Installs and build all libs, components, microapps and parent app

---

### To create new microapp

_NB this process should - and will one day - be automated with a script_

- copy existing microapp folder (e.g. `account`)
- new microapp `webpack.config.js`: change `id`
- in root `package.json`: add object to `apps` array and add start script
- in microapp `package.json`: change `name` and `port` number (and remove any unneeded dependencies)
- `[microapp]/app.js`: make appropriate content / route changes
- `app/app.js`: add new routes as above (so the microapp can be called from the parent)
- `index.js`: change render and mount functions
- `index.ejs`: change title; change `onload` script (i.e. `window.onload = () => {window.renderAccount('container')`); change `src` of script tag at bottom of page
- `[microapp]/container`: make changes as needed
