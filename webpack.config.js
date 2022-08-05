var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',

         APP_URL:'"https://upstate.kingspickleballladder.com/"',
         API_URL: '"https://api01.kingspickleballladder.com/api"',
         Backend_URL:'"https://api01.kingspickleballladder.com"',


        // APP_URL:'"https://charlotte.kingspickleballladder.com/"',
        // API_URL: '"https://apicharlotte.kingspickleballladder.com/api"',
        // Backend_URL:'"https://apicharlotte.kingspickleballladder.com"',


        //APP_URL:'"http://kingspickle.loc/"',
        //API_URL: '"http://api.kingspickle.loc/api"',
        //Backend_URL:'"http://api.kingspickle.loc"',
	PAYPAL_CLIENT_ID:'"AV_UagLBvD8CEfhRHJLxqltJFNijOKdiV-56hCdwYMUNUx49hY08SwRh7Lq_Gg67pnwCdF3i_guDx0Ag"',
       
	 //Client ID for test Purpose
       // PAYPAL_CLIENT_ID:'"AWKpM81625g_1Cjpeg7A8gKOGso6xS144JLR1SC0yVDdDiSy_LRvr8kN_Ube3TGNx8qyhKPf6nD_nq6j"',
	location: '"upstate"',
        location_name: '"the Upstate SC"',
        other_location_url: '"https://charlotte.kingspickleballladder.com/"',
        other_location_name: '"Charlotte"',


         //location: '"charlotte"',
         //location_name: '"Charlotte"',
         //other_location_url: '"https://upstate.kingspickleballladder.com/"',
         //other_location_name: '"the Upstate SC"',

      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
if (process.env.NODE_ENV === 'development') {

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        APP_URL:'"http://localhost:8080"',
        API_URL: '"http://localhost:8000/api"',
        Backend_URL:'"http://localhost:8000"'
        // APP_URL:'"http://kings.com/"',
        // API_URL: '"http://api.kings.com/api"',
        // Backend_URL:'"http://api.kings.com"',
      }
    })
  ]);
}
