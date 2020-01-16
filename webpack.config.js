


const path                 = require('path');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");


module.exports = {

    entry: ['./src/index_new.jsx'],
    mode: "development",
    module: {
      rules: [



        {
          test: /\.(js|jsx)$/,
          exclude: [
            '/node_modules/',
            // '/src/index_old.jsx',
            // './'
          ],
          use: ['babel-loader']
        },


        // {
        //   test: /\.css$/,
        //   use: ExtractTextWebpackPlugin.extract({
        //     use: "css-loader",
        //   }),
        // },


        // {
        //     test: /\.json$/,
        //     // loader: 'json-loader'
        //     // use: ['json-loader']
        //     use: ['raw-loader']
        // },


      ]
    },

    // plugins: [new ExtractTextWebpackPlugin("styles.css")],

    // resolve: {
    //   extensions: ['*', '.js', '.jsx']
    // },

    output: {
        // path: __dirname,
        // publicPath: '/',
        // filename: 'public/bundle.js'
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};
