// NB This script is the same for all MicroApps and the Parent App

const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const { name } = require('./package.json')
const config = require('../_webpack-config')

module.exports = config({
  id: 'account',
  name,
  Dotenv,
  ErrorOverlayPlugin,
  htmlWebpackPlugin
})
