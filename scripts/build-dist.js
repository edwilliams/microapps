const { copyFolderRecursiveSync, copyAppIndexHtml } = require('./utils')

const init = async () => {
  copyFolderRecursiveSync('./static/.', './dist/')
  await copyAppIndexHtml({ folder: 'dist' })
}

init()
