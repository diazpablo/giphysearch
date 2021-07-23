const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
});
