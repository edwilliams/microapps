'use strict'

const fs = require('fs')
const { promisify } = require('util')
const copyFile = promisify(fs.copyFile)

try {
  console.log('copying components dist over to static server')
  copyFile(
    'dist/microapp-components.js',
    '../static/js/microapps/microapp-components.js'
  )
} catch (error) {
  console.log(
    'error: unable to copy components dist over to static server',
    error
  )
}
