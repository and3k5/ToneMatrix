var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');

module.exports = function (_, options) {
    return [
        {
            mode: options.watch === true ? "development" : "production",
            entry: './src/js/tonematrix.js',
            output: {
                filename: 'main.js',
                path: path.resolve(__dirname),
            },
            module: {
                rules: [
                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                            MiniCssExtractPlugin.loader,
                            "css-loader",
                            {
                                loader: "sass-loader",
                                options: {
                                    implementation: require("sass"),
                                    sassOptions: {
                                        fiber: false,
                                    },
                                },
                            },
                        ],
                    },
                    {
                        test: /\.css$/i,
                        use: [MiniCssExtractPlugin.loader, 'css-loader'],
                    },
                    {
                        test: /\.vue$/,
                        loader: 'vue-loader'
                    },
                ],
            },
            plugins: [
                new MiniCssExtractPlugin(),
                new HtmlWebpackPlugin({
                    title: "ToneMatrix",
                    template: "src/index.html"
                }),
                new VueLoaderPlugin(),
            ],
        }
    ]
};