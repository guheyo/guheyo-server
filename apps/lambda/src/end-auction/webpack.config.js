const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, './index.ts'),
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../../../../dist/apps/lambda/end-auction'),
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../../../../node_modules/.prisma'),
          to: path.resolve(__dirname, '../../../../dist/apps/lambda/end-auction/node_modules/.prisma')
        },
        {
          from: path.resolve(__dirname, '../../../../node_modules/@prisma'),
          to: path.resolve(__dirname, '../../../../dist/apps/lambda/end-auction/node_modules/@prisma')
        }
      ]
    })
  ]
};
