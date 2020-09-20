var path = require('path');
var pkgPath = "D:\\three2\\node_modules\\webpack-cli\\package.json";
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
module.exports = {
    // entry:'./src/index.js',
    entry: __dirname + "/src/index.ts",
    // {
    //         //  app: './src/index.js',
    //         //  print: './src/print.js'
    //          app: './src/index.ts'
    //        },
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        //new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
        //filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
                exclude: /node_modules/
            },
            { test: /\.vue$/, loader: "vue-loader", exclude: /node_modules/ },
            {
                test: /\.(png|svg|jpg|gif|get|mat)$/,
                use: [
                    'file-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ],
                exclude: /node_modules/
            }
        ]
    }
};
//# sourceMappingURL=webpack.config.js.map