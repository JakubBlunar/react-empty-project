const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const path = require('path');

const parentDir = path.join(__dirname, '../');

const host = 'localhost';
const port = 8000;

module.exports = merge(common, {
	devtool: '#inline-source-map',
	devServer: {
		contentBase: parentDir,
		historyApiFallback: true,
		inline: true,
		port,
		host,
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			__DEV__: true,
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.ejs',
			minify: {
				removeComments: false,
				collapseWhitespace: true,
			},
			inject: true,
		}),
		/* new OpenBrowserPlugin({
            url: 'http://' + host + ':' + port
        }) */
	],

});
