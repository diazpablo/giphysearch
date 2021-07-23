const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    app: ["@babel/polyfill", "./src/index.js"]
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "app.bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource"
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "static",
          noErrorOnMissing: true
        }
      ]
    })
  ],
  stats: {
    all: false,
    entrypoints: true,
    chunkGroups: true,
    timings: true,
    errors: true
  }
};