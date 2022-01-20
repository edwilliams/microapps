const { exec } = require('./utils')

const init = async () => {
  await exec('npm run build').catch(console.log)
}

init()
