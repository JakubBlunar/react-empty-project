var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../');

const prod = process.argv.indexOf('-p') !== -1;

module.exports = {
    entry: [
        'babel-polyfill',
        path.join(parentDir, 'index.js')
    ],
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }, {
            test: /\.less$/,
            loaders: ["style-loader", "css-loder", "less-loader"]
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        },
        {
            test: /\.scss$/,
            loader: 'style-loader!css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader',
        },
        {
            test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
            loader: "file-loader",
            options: {
                name(file) {
                    if (!prod) {
                        return '[path][name].[ext]'
                    }

                    return 'assets/[hash].[ext]'
                }

            }
        }]
    },
    output: {
        path: parentDir + '/dist',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}