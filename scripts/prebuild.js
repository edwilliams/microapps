'use strict'

const rimraf = require('rimraf')

const init = async () => {
  rimraf.sync(`${process.env.NAME}/dist`)
}

init()
