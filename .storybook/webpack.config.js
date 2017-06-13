var path = require('path');

module.exports = {
  plugins: [
    // your custom plugins
  ],
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
  resolve: {
    modules: [
      path.resolve(__dirname, '../src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx']
  },
};
