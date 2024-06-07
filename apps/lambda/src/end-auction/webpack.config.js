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
    extensions: ['.ts', '.js'],
    alias: {
      '@lib/domains': path.resolve(__dirname, '../../../../libs/domains/src'),
      '@lib/shared': path.resolve(__dirname, '../../../../libs/shared/src'),
    }
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
          from: path.resolve(__dirname, '../../../../node_modules/.prisma/client/libquery_engine-linux-arm64-openssl-3.0.x.so.node'),
          to: path.resolve(__dirname, '../../../../dist/apps/lambda/end-auction/libquery_engine-linux-arm64-openssl-3.0.x.so.node')
        },
        {
          from: path.resolve(__dirname, '../../../../node_modules/.prisma/client/schema.prisma'),
          to: path.resolve(__dirname, '../../../../dist/apps/lambda/end-auction/schema.prisma')
        }
      ]
    })
  ]
};
