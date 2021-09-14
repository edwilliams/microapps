'use strict'

const fs = require('fs')
const { promisify } = require('util')
const glob = promisify(require('glob'))
const copyFile = promisify(fs.copyFile)

// copy dist js over to static
const init = async () => {
  const files = await glob(`${process.env.NAME}/dist/*.js`)
  files.forEach(str => {
    const fileName = str.split('dist/')[1]
    copyFile(
      `${process.env.NAME}/dist/${fileName}`,
      `./static/js/microapps/${fileName}`
    )
  })
}

init()
