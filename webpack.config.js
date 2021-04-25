const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    bundle: './src/index.tsx'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [new webpack.EnvironmentPlugin(['NODE_ENV'])],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss', 'sass'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
