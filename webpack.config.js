const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
      },
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: 'js/bundle.js'
    // },
    devServer: {
        contentBase: './dist'
    },
    target: 'web',
    devtool: '#source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './index.html',
            favicon: 'src/img/favicon.ico'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                // Loads the javacript into html template provided.
                // Entry point is set below in HtmlWebPackPlugin in Plugins 
                test: /\.html$/,
                use: [
                  {
                    loader: "html-loader",
                    //options: { minimize: true }
                  }
                ]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: ['file-loader']
            }
        ]
    }
};