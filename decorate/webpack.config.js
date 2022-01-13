/*
 * @Date: 2021-10-17 09:31:52
 * @Descripton: 
 * @LastEditTime: 2021-10-17 20:50:23
 */
const path = require('path');

const config = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.jsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react"],
            plugins: ["transform-class-properties", "transform-decorators-legacy"]
          }
        }
      }
    ]
  },
  devtool: "inline-source-map"

};

module.exports = config;