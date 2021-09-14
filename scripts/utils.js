const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { renderFile } = require('ejs')
const writeFile = promisify(fs.writeFile)
const { microApps } = require('../package.json')

const copyFileSync = (source, target) => {
  let targetFile = target

  // if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source))
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source))
}

const copyFolderRecursiveSync = (source, target) => {
  let files = []

  // check if folder needs to be created or integrated
  const targetFolder = path.join(target, path.basename(source))
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder)
  }

  // copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source)
    files.forEach(function (file) {
      const curSource = path.join(source, file)
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder)
      } else {
        copyFileSync(curSource, targetFolder)
      }
    })
  }
}

const exec = cmd => {
  const _exec = require('child_process').exec
  return new Promise((resolve, reject) => {
    _exec(cmd, (error, stdout, stderr) => {
      if (error) reject(error)
      if (stderr) reject(stderr)
      resolve(stdout)
    })
  })
}

const copyAppIndexHtml = async ({ folder }) => {
  console.log('creating / writing App index.html\n\n')

  const versions = {}
  microApps.forEach(({ id, version }) => {
    versions[id] = version
  })

  // techdebt: not ideal naming to use htmlWebpackPlugin object
  const html = await renderFile('app/src/index.ejs', {
    htmlWebpackPlugin: {
      options: {
        versions,
        production: true
      }
    }
  }).then(output => output)
  await writeFile(`./${folder}/index.html`, html, 'utf8')
}

module.exports = {
  copyFileSync,
  copyFolderRecursiveSync,
  exec,
  copyAppIndexHtml
}
