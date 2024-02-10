const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      database: './src/js/database.js',
      main: './src/js/index.js',
      install: './src/js/install.js',
      header: './src/js/header.js',
      editor: './src/js/editor.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE',
      }),

      new InjectManifest ({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),

      new WebpackPwaManifest ({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        background_color: '#212ca4',
        theme_color: '#212ca4',
        start_url: '/',
        publicPath: '/',
        icons: [ {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
         
        ],
      }),
    ],

    //TODO: Add CSS loaders and babel to webpack.
    module: {
      rules: [
        {
          test: /\.css$/i,
          use:
          ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-read-spread', '@babel/transform-runtime']
            },
          },
        },
      ],
    },
  };
};
