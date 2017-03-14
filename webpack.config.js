const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcPath = path.join(__dirname, './src');
const distPath = path.join(__dirname, './dist');

module.exports = function (env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  //Default plugins for prod/dev
  const plugins = [
    new ExtractTextPlugin({filename:"style.css",allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
    new webpack.NamedModulesPlugin(),
  ];

  ////////Entry
  const entry =  {
    vendor: ['babel-polyfill','react'],
    js: ['./index.js']
  };

  /////////Modules (loaders)
  const module = {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ],
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            query: {
              name: '[name].[ext]'
            },
          },
        },
        {test: /\.(jpe?g|png|gif|svg|eot)[\?]?.*$/, use:{loader: 'url-loader?limit=10000&name=assets/[name].[ext]'}},
      ]
  };

  /****************************
            Plugins & Loaders
   ****************************/
  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          postcss: [
            autoprefixer({
              browsers: [
                'last 3 version',
                'ie >= 9',
              ],
            }),
          ],
          context: srcPath
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false,
        },
      })
    );

    ///loaders:
    module.rules.push({
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader', 'sass-loader']
      })
    });

  } else {
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
    
    ///loaders:
    module.rules.push({
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [{
            loader: 'style-loader'
        },
        {
            loader: 'css-loader',
            query: {sourceMap: true}
        },
        {
          loader:'postcss-loader'
        },
        {
            loader: 'sass-loader',
            query: {
              sourceMap: true,
              sourceComments: true
            }
        }]
    });

     entry.vendor.push('webpack-hot-middleware/client?reload=true');
  }


  /****************************
          config Object
   ****************************/
  return {
    devtool: isProd ? 'eval': 'source-map',
    context: srcPath,
    entry: entry,
    output: {
      path: distPath,
      filename: '[name].bundle.js',
    },
    plugins,
    module,

    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
      modules: [
        path.resolve(__dirname, 'node_modules'),
        srcPath
      ]
    },
    
    performance: isProd && {
      maxAssetSize: 100,
      maxEntrypointSize: 300,
      hints: 'warning',
    },

    stats: {
      colors: {
        green: '\u001b[32m',
      }
    },

    devServer: {
      contentBase: './src',
      historyApiFallback: true,
      port: 3000,
      compress: isProd,
      inline: true,
      hot: !isProd,
      stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true,
        colors: {
          green: '\u001b[32m',
        }
      },
    }
  };
};
