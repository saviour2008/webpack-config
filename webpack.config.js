//基于node的common.js
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');
let PurifycssWebpack = require('purifycss-webpack');
let glob = require('glob');
let CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: "./src/index.js",
    output: {
        // 把所有依赖的模块合并输出到一个 main.js 文件
        filename: 'main.js',
        // 输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
    },
    devServer: {
        contentBase: './dist',
        port: 3000,
        compress: true,
        open: true,
        hot: true
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].[hash:8].css',
            allChunks: true
        }),//生成css文件,如果之前new的话,那么可以在这直接引用
        
        new webpack.HotModuleReplacementPlugin(),//热更新
        new CleanWebpackPlugin(['./dist']),//清之前编译后的文件

        new HtmlWebpackPlugin({
            template: './src/index.html',
            hash: true
        }),//生成编译的html的模板
        new PurifycssWebpack({
            paths: glob.sync(path.resolve('src/*.html'))
        }),//清理src用不上的css样式
        new CopyWebpackPlugin([{
            from: './src/doc',
            to: 'public'
        }]),
    ],
    module: {
        rules: [
            {
                //用正则
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader'],
                })
            }
        ]
    },
    mode: "development"
}