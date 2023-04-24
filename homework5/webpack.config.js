const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.default = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/index.js',
    output: {
        clean: true,
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {test: /\.ts$/, use: 'ts-loader'},
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({template: 'index.html'}),
    ],
};