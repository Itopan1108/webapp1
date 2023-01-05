const GasPlugin = require("gas-webpack-plugin")
const CopyFilePlugin = require("copy-webpack-plugin")

module.exports = {
  context: __dirname,
  entry: "./main.js",
  output: {
    path: __dirname ,
    filename: './dist/Code.gs'
  },
  plugins: [
    new GasPlugin(),
    new CopyFilePlugin({
      patterns: [
        {
          from: "appsscript.json",
          to: "dist"
        },
      ],
    }),
  ]
}
