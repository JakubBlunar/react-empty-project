const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const parentDir = path.join(__dirname, '../');

const prod = process.argv.indexOf('-p') !== -1;

module.exports = {
	entry: [
		'babel-polyfill',
		path.join(parentDir, 'src/index.jsx'),
	],
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				plugins: ['transform-runtime', "transform-class-properties"],
				presets: ['react', 'es2015', 'stage-0']
			},

		}, {
			test: /\.less$/,
			loaders: ['style-loader', 'css-loder', 'less-loader'],
		},
		{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: "css-loader"
			})
		},
		{
			test: /\.scss$/,
			loader: 'style-loader!css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader',
		},
		{
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'url-loader?limit=10000&mimetype=application/font-woff',
			options: {
				name(file) {
					if (!prod) {
						return '[path][name].[ext]';
					}

					return 'assets/fonts/[hash].[ext]';
				},

			},
		},
		{
			test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'file-loader',
			options: {
				name(file) {
					if (!prod) {
						return '[path][name].[ext]';
					}

					return 'assets/fonts/[hash].[ext]';
				},

			},
		},
		{
			test: /\.(jpe?g|gif|png|wav|mp3|svg)$/,
			loader: 'file-loader',
			options: {
				name(file) {
					if (!prod) {
						return '[path][name].[ext]';
					}

					return 'assets/images/[hash].[ext]';
				}
			}
		},
		{
			test: /\.(wav|mp3)$/,
			loader: 'file-loader',
			options: {
				name(file) {
					if (!prod) {
						return '[path][name].[ext]';
					}

					return 'assets/music/[hash].[ext]';
				}
			}
		}],
	}, 
	plugins: [
		new ExtractTextPlugin("style.css"),
	],
	output: {
		path: `${parentDir}/dist`,
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
};
