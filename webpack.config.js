const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        demo: './demo/index.ts',
        dbmon: './dbmon/index.tsx'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: ''
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        // compress: {
        //     warnings: false
        // }
        // })
    ],
    module: {
        loaders: [{
            test: /\.ts/,
            loader: 'ts',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }]
    }
};
