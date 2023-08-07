const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    mode: "development",
    devtool: "source-map",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index-template.html',
            inject: "body"
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ],
    }
};

module.exports = config;