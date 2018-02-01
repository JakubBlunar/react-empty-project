const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const parentDir = path.join(__dirname, '../');

const host = process.env.host || 'localhost';
const port = process.env.port || 3000;

module.exports = merge(common, {
	devtool: '#inline-source-map',
	devServer: {
		contentBase: parentDir,
		historyApiFallback: true,
		inline: true,
		port,
		host
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			__DEV__: true,
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin("style.css"),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.ejs',
			favicon: 'public/favicon.ico',
			inject: true,
		})
		/* new OpenBrowserPlugin({
            url: 'http://' + host + ':' + port
        }) */
	]
});
