const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const analyze = process.env.ANALYZE;

const GLOBALS = {
	'process.env.NODE_ENV': JSON.stringify('production'),
	__DEV__: false,
};

const pathsToClean = [
	'dist'
];

const cleanOptions = {
	root: process.cwd(),
};

module.exports = merge(common, {
	output: {
		filename: '[name].[chunkhash].js'
	},
	plugins: [		
		new webpack.DefinePlugin(GLOBALS),
		new CleanWebpackPlugin(pathsToClean, cleanOptions),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.[chunkhash].js',
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
				join_vars: true
			},
			output: {
				comments: false
			}}
		),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					autoprefixer({
						browsers: [
							'last 3 version',
							'ie >= 10'
						]
					})
				],
				context: './public'
			}
		}),
		new WebpackMd5Hash(),
		new HtmlWebpackPlugin({
			template: 'src/index.ejs',
			favicon: 'public/favicon.ico',
			excludeChunks: ['base'],
			minify: {
				collapseWhitespace: true,
				collapseInlineTagWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true
			}
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessorOptions: {
			safe: true,
			discardComments: {
				removeAll: true,
			},
			},
		}),
		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: 'defer'
		}),
		new ExtractTextPlugin({
			filename: '[name].[contenthash].css',
			allChunks: true
		}),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.css$|\.eot$|\.ttf$|\.woff$|\.svg$$/,
			threshold: 0,
			minRatio: 0.75,
			deleteOriginalAssets: !analyze
		})
	]
});
