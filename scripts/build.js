const mkdirp = require('mkdirp')
const { exec } = require('./utils')

const { microApps } = require('../package.json')

const init = async () => {
  console.log('install node_modules in microapps then build\n\n')

  mkdirp(`static/js/microapps`, { recursive: true })

  // build first as will be copied over
  console.log('- building: libs\n\n')
  await exec('cd libs && npm i && npm run build; cd -').catch(console.log)

  console.log('- building: components\n\n')
  await exec('cd components && npm i && npm run build; cd -').catch(console.log)

  console.log('- building: app\n\n')
  await exec('cd app && npm i && npm run build; cd -').catch(console.log)

  const names = microApps.map(({ id }) => id).join(', ')
  console.log(`- building: ${names}\n\n`)

  const promises = microApps.map(({ id }) =>
    exec(`cd ${id} && npm i && npm run build; cd -`)
  )
  await Promise.all(promises).catch(console.log)
}

init()
