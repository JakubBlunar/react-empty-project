const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: false
};

const pathsToClean = [
    'dist',
    'build'
]

const cleanOptions = {
    root: process.cwd()
}

module.exports = merge(common, {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
        new webpack.DefinePlugin(GLOBALS),
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new WebpackMd5Hash(),
        new HtmlWebpackPlugin({
            template: 'index.ejs',
            //favicon: 'src/favicon.ico',
        })
    ]
});