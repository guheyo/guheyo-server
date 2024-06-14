const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, './index.ts'),
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../../../../dist/apps/lambda/auction-ending-soon'),
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@lib/domains': path.resolve(__dirname, '../../../../libs/domains/src'),
      '@lib/shared': path.resolve(__dirname, '../../../../libs/shared/src'),
      'discord.js': path.resolve(__dirname, '../../../../node_modules/discord.js/src/index.js'),
    },
    fallback: {
      "bufferutil": require.resolve('bufferutil'),
      "utf-8-validate": require.resolve('utf-8-validate'),
    },
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          target: 'esnext',
        },
      },
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
    ],
    exprContextCritical: false,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../../../../node_modules/.prisma/client/libquery_engine-linux-arm64-openssl-3.0.x.so.node'),
          to: path.resolve(__dirname, '../../../../dist/apps/lambda/auction-ending-soon/libquery_engine-linux-arm64-openssl-3.0.x.so.node'),
        },
        {
          from: path.resolve(__dirname, '../../../../node_modules/.prisma/client/schema.prisma'),
          to: path.resolve(__dirname, '../../../../dist/apps/lambda/auction-ending-soon/schema.prisma'),
        },
      ],
    }),
  ],
};
