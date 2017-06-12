var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './demo/index.jsx',
  output: {
    path: __dirname,
    filename: 'demo/index.js',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'demo'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'demo'),
        ],
        exclude: /node_modules/,
        query: {
          presets: [
            'es2015',
            'stage-0',
            'react',
            'flow',
          ],
          plugins: [
            "transform-flow-comments",
          ]
        }
      }
    ]
  },
};
