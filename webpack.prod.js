const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin"); //default with webpack 4

module.exports = {
  entry: "./src/client/index.js",
  mode: "production",
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
  }, //Terser minifies JS and OptimizesCssAssets optimizes css files
  output: {
    libraryTarget: "var",
    library: "Client", //Fixes our js functionality again
    filename: "[name]-[contentHash].js", //cache busting
    //path: path.resolve(__dirname, "dist") //same as default
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/, //exclude node module folder and files
        loader: "babel-loader", //turns ES6 to Vanilla ES5
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      //Enables our build file to be linked to html file
      template: "./src/client/views/index.html",
      filename: "./index.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
    new MiniCssExtractPlugin({
      //utputs the CSS files in separate folders
      filename: "[name]-[contentHash].css",
    }),
  ],
};
