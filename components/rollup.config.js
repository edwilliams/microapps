import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

// console.log()

export default {
  input: 'src/index.js',
  output: {
    // https://github.com/rollup/rollup-plugin-commonjs/issues/6#issuecomment-519537010
    intro: 'const global = window; const process = { env: {} }',
    globals: {
      react: 'React',
      'microapp-libs': 'MicroApp'
    },
    file: process.env.NODE_ENV === 'development' ? pkg['main-dev'] : pkg.main,
    format: 'iife',
    sourcemap: false
  },
  plugins: [
    url(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs(),
    filesize(),
    terser()
  ],
  external: ['react', 'microapp-libs']
}
