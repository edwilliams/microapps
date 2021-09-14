const path = require('path')

module.exports = ({
  id,
  name,
  Dotenv,
  ErrorOverlayPlugin,
  htmlWebpackPlugin
}) => {
  const plugins = [
    new Dotenv(),
    new ErrorOverlayPlugin(),
    new htmlWebpackPlugin({
      inject: name !== 'microapp-app',
      production: false,
      template: './src/index.ejs',
      filename: './index.html'
    })
  ]

  return {
    output: {
      filename: `${name}.min.js`
    },
    devtool: 'source-map',
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-router-dom': 'ReactRouterDOM',
      'microapp-libs': 'MicroAppLibs',
      'microapp-components': 'MicroAppComponents'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        utils: path.resolve(__dirname, `${id}/src/utils/`),
        config: path.resolve(__dirname, `${id}/src/config/`)
      }
    },
    devServer: {
      open: false,
      contentBase: path.join(__dirname, 'static'),
      host: 'localhost' //use '0.0.0.0' to enable WDS to listen for requests from the network
    },
    plugins
  }
}
