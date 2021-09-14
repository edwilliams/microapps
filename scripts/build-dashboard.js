const { copyFolderRecursiveSync, copyAppIndexHtml } = require('./utils')

const mkdirp = require('mkdirp')
const { renderFile } = require('ejs')
const { promisify } = require('util')
const fs = require('fs')

const writeFile = promisify(fs.writeFile)

const { microApps } = require('../package.json')

const copyStaticContent = async ({ folder }) => {
  console.log('copying static content to dashboard\n\n')
  try {
    mkdirp(`./${folder}/css`, { recursive: true })
    copyFolderRecursiveSync(`./static/css`, `./${folder}`)

    mkdirp(`./${folder}/js`, { recursive: true })
    copyFolderRecursiveSync(`./static/js`, `./${folder}`)
  } catch (error) {
    console.log(`error: copying static content to ${folder}`, error)
  }
}

const copyMicroAppIndexHtmlFiles = async id => {
  console.log(`copying MicroApp (${id}) index.html file to dashboard\n\n`)

  const versions = {}
  microApps.forEach(({ id, version }) => {
    versions[id] = version
  })

  // techdebt: not ideal naming to use htmlWebpackPlugin object
  const html = await renderFile(`${id}/src/index.ejs`, {
    htmlWebpackPlugin: {
      options: {
        versions,
        production: true,
        CONTENT_HOST: '',
        isDashboard: true
      }
    }
  }).then(output => output)

  writeFile(`./dashboard/${id}/index.html`, html)
}

const createDashboardIndexHtml = async () => {
  console.log('creating / writing Dashboard index.html\n\n')
  const html = await renderFile('scripts/dashboard.ejs', { microApps }).then(
    output => output
  )
  await writeFile('./dashboard/index.html', html, 'utf8')
}

const init = async () => {
  await Promise.all(microApps.map(({ id }) => mkdirp(`dashboard/${id}`)))
  await Promise.all(microApps.map(({ id }) => mkdirp(`dashboard/${id}/css`)))
  await Promise.all(microApps.map(({ id }) => mkdirp(`dashboard/${id}/js`)))

  // for the microapps
  await Promise.all(
    microApps.map(({ id }) => copyStaticContent({ folder: `dashboard/${id}` }))
  )

  await Promise.all(microApps.map(({ id }) => copyMicroAppIndexHtmlFiles(id)))

  // for the dashboard index.html
  copyStaticContent({ folder: `dashboard` })
  createDashboardIndexHtml()
}

init()
