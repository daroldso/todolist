module.exports = {
  entry: './src/browser/js/app.js',
  devtool: 'cheap-eval-source-map',
  output: {
    filename: './public/js/app.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  }
};
