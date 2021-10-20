## MycroApps

<img src="logo.png"/>

Demo: [mycroapps.netlify.app](https://mycroapps.netlify.app/)

---

### MicroApps - Why?

The rationale behind MicroApps is:

- Cordova / Deployment: Only need to submit the “Parent App” to App Stores (the MicroApp’s are loaded dynamically)
- Testing: QA can test the updated MicroApp in the knowledge the Parent App has not been modified
- Independent deployment: Reduce the scope of any given deployment and in turn reduce the associated risk
- Performance: Assets loaded dynamically as needed
- Smaller bundles: multiple MicroApp bundles as opposed to single Monolith bundle
- Autonomous teams: Separate developers working on separate MicroApps (....MicroApps could even be written in different languages!)
- Encourage good practice / separation of concerns: e.g. Schedule specific assets in Schedule MicroApp only. Shared assets treated as such

---

### MicroApps - How?

- iFrames: Isolated Apps (comms with postMessage)
- Build time: Private NPM packages (or hosted registries)
- Run time: Parent App consumes MicroApp via Javascript files

---

<details>

<summary>Further Reading</summary>

[Micro Frontends - Martin Fowler](https://martinfowler.com/articles/micro-frontends.html)

[MicroFrontends.org](https://micro-frontends.org/)

[Understanding Micro Frontends - Hackernoon](https://hackernoon.com/understanding-micro-frontends-b1c11585a297)

[Microsoft advocating hosting web apps in Cordova shells](https://docs.microsoft.com/en-us/previous-versions/visualstudio/cross-platform/tools-for-cordova/tips-workarounds/run-web-app-in-cordova?view=toolsforcordova-2017)

</details>

---

MycroApps uses a monorepo and runtime approach (see contrived example [here](./runtime-demo))

---

### Getting Started

**Development**

- `npm install`
- `npm start` (_NB `npm run build` needs to be run first_)

**Production**

- `npm run build`
- serve the `dist` folder for app / microapps
- serve the `dashboard` folder to demo microapps individually

---

### Commands

The following commands can be executed in the root folder

- `start`: Runs the main "parent" App
- `start:account`: Runs the Account MicroApp
- `build:dist`: Builds the folder that gets deployed
- `build:dashboard`: Builds the MicroApp Dashboard (for QA / internal)
- `build`: Installs and build all libs, components, microapps and parent app

---

### How to create new microapp called, for example, "Messages"

_NB this process should - and will one day - be automated with a script_

- copy existing microapp folder (e.g. `account`)

**In parent App**

- `src/app.js`: create new route with `<MicroApp/>` component
- `package.json`: add new object to `apps` array and add start script. e.g.

```JSON
{
  "id": "messages",
  "name": "Messages",
  "url": "messages/#/messages"
}
```

**In MicroApp**

- `webpack.config.js`: rename `id` to "messages"
- `package.json`: rename `name` in name field - and in `prebuild` and `postbuild` scripts - to "messages" (and remove any unneeded dependencies)
- `app.js`: rename route to "messages" and remove unwated content
- `index.js`: rename render and mount functions (`renderMessages` and `unmountMessages`)
- `index.ejs`:
  - rename title to "messages"
  - change `onload` script (i.e. `window.onload = () => {window.renderMessages('container')`)
  - change `src` of script tag (i.e. `microapp-messages.min.js`)
