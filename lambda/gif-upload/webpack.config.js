const path = require('path');

module.exports = {
  entry: './src/import.js',
  output: {
    path: __dirname + '/dist',
    filename: 'import.js',
	library: 'import',
	libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        exclude: /node_modules/
      }
    ]
  },
  mode: 'development',
  devtool:false,
  resolve: {
    fallback: {
	  "fs":false,
	  "stream": require.resolve("stream-browserify")
    }
  }
};