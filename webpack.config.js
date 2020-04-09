const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCss = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const HtmlPlugin = new HtmlWebpackPlugin({
    filename: "index.html",
    template: path.join(__dirname, "/public/index.html")
});
const MiniCss = new MiniCssExtractPlugin({
    filename: "index.css",//生成的文件名
});

module.exports = {
    entry: "./src/index.jsx",
    mode: "development",
    optimization: {//优化项
        minimizer: [//压缩选项
            new UglifyJsPlugin({//压缩js
                cache: true,//是否使用缓存
                parallel: true,//是否使用并发打包
                sourceMap: true//是否使用源码映射
            }),
            new OptimizeCss({})//压缩css
        ]
    },
    output: {
        filename: "main.js",
        path: path.join(__dirname, "/build")
    },
    devServer: {
        port: 3000,
        host: "127.0.0.1",
        progress: true,
        proxy: {//代理
            '/Api': {
                target: "http://49.234.9.206:3002/",
                pathRewrite: {"^/Api": ""}
            }
        }
    },
    module: {
        rules: [
            {test: /\.js$/,use: {
                    loader: "eslint-loader",
                    options: {
                        enforce: "pre"//loader的默认顺序是从下到上的，"pre"可以让这个loader首先执行,"post"为最后执行
                    }
                }},//eslint语法规范校验
            {test: /\.js|jsx$/, use: ["babel-loader"], exclude: /node_modules/},
            {test: /\.css$/, use: [MiniCssExtractPlugin.loader,"css-loader", "postcss-loader"]},
            {test: /\.less$/, use: [MiniCssExtractPlugin.loader, {loader: "css-loader", options: {modules: true}}, "postcss-loader", "less-loader"]},
            {test: /\.(png|jpg|gif)$/, use: [{loader: 'url-loader', options: {limit: 1, outputPath: "./images"}}]},
            {test: /\.(woff|woff2|eot|ttf|otf)$/, use: [{loader: 'url-loader', options: {limit: 1, outputPath: "./fonts"}}]}
        ]
    },
    resolve: {
        extensions: [".js",".jsx",".json"],
        alias: {
            "@": path.join(__dirname,"./src"),
            "@com": path.join(__dirname,"./src/component"),
            "@view": path.join(__dirname,"./src/view"),
            "@img": path.join(__dirname,"./public/img")
        }
    },
    devtool: "source-map",//增加映射文件
    plugins: [HtmlPlugin, MiniCss, require('autoprefixer')]
};
