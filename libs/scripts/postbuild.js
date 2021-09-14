'use strict'

const fs = require('fs')
const { promisify } = require('util')
const copyFile = promisify(fs.copyFile)

try {
  console.log('copying libs dist over to static server')
  copyFile('dist/microapp-libs.js', '../static/js/microapps/microapp-libs.js')
} catch (error) {
  console.log('error: unable to copy libs dist over to static server', error)
}
