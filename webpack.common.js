const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
      app: './src/index.js',
    },
    output: {
      filename: 'main.bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: "./src/template.html",
          title: 'Production',
        }),
      ],
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.html$/i,
            loader: "html-loader",
          },
          {
            test: /\.(svg)$/i,
            type: "asset/resource",
          },
          {
            test: /\.(woff|woff2|ttf)$/i,
            type: "asset/resource",
          }
        ],
      },
  };