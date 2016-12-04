const path = require('path')
const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')

const assetsPath = path.resolve(process.cwd(), './static/dist')

module.exports = function (config) {
  // config.webpackIsomorphicTools = {
  //   assets: {
  //     images: {
  //       extensions: [
  //         'jpeg',
  //         'jpg',
  //         'png',
  //         'gif'
  //       ],
  //       parser: WebpackIsomorphicToolsPlugin.url_loader_parser
  //     },
  //     fonts: {
  //       extensions: [
  //         'woff',
  //         'woff2',
  //         'ttf',
  //         'eot'
  //       ],
  //       parser: WebpackIsomorphicToolsPlugin.url_loader_parser
  //     },
  //     svg: {
  //       extension: 'svg',
  //       parser: WebpackIsomorphicToolsPlugin.url_loader_parser
  //     },
  //     style_modules: {
  //       extensions: ['scss'],
  //       filter (module, regex, options, log) {
  //         if (options.development) {
  //           return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log)
  //         }
  //
  //         return regex.test(module.name)
  //       },
  //       path (module, options, log) {
  //         if (options.development) {
  //           return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log)
  //         }
  //
  //         return module.name
  //       },
  //       parser (module, options, log) {
  //         if (options.development) {
  //           return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log)
  //         }
  //
  //         return module.source
  //       }
  //     }
  //   }
  // }
  //
  // const webpackIsomorphicPlugin = new WebpackIsomorphicToolsPlugin(config.webpackIsomorphicTools)

  config.webpack = {}
  config.webpack.devtool = 'source-map'
  config.webpack.context = process.cwd()
  config.webpack.entry = {
    main: ['./app/client/index.js']
  }

  config.webpack.output = {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  }

  config.webpack.module = {}
  config.webpack.module.loaders = [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
    },
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    },
    // {
    //   test: webpackIsomorphicPlugin.regular_expression('images'),
    //   loader: 'url-loader?limit=10240'
    // }
  ]

  config.webpack.module.progress = true
  config.webpack.module.resolve = {
    modulesDirectories: ['node_modules', 'app', 'config'],
    extensions: ['', '.json', '.js', '.jsx']
  }
  config.webpack.module.plugins = [
    new CleanPlugin([assetsPath], { root: process.cwd() }),
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.IgnorePlugin(/\.\/development/, /\/config$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    // webpackIsomorphicPlugin
  ]
}
