'use strict'

const rimraf = require('rimraf')

const init = async () => {
  rimraf.sync('dist')
}

init()
