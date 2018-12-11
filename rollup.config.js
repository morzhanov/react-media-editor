import { uglify } from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

const config = {
  input: 'src/index.js',
  external: ['react', 'lodash', 'react-modal'],
  output: {
    format: 'umd',
    name: 'react-media-editor',
    globals: {
      react: 'React',
      lodash: 'lodash',
      'react-modal': 'react-modal'
    }
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
    // uglify()
  ]
}
export default config
