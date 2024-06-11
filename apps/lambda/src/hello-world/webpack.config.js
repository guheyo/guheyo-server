const path = require('path');

module.exports = {
  entry: path.join(__dirname, './index.ts'),
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../../../../dist/apps/lambda/hello-world'),
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015',
        },
      },
    ],
  },
};
