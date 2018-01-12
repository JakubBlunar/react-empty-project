const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Visualizer = require('webpack-visualizer-plugin');
const merge = require('webpack-merge');

const prod = require('./webpack.prod.config.js');

module.exports = merge(prod, {
	plugins: [
		new BundleAnalyzerPlugin(),
		new Visualizer({
			filename: '../dist/statistics.html',
		}),
	],
});
