const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
        }),
        new CopyWebpackPlugin({
            patterns: [
                "src/media.json",
                { from: "src/res/Test videos folder 1/", to: "Test videos folder 1/" },
                { from: "src/res/Test videos folder 2/", to: "Test videos folder 2/" },
            ]
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