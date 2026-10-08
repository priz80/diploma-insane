const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./admin.js",
  output: {
    filename: "admin.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "development",
  devServer: {
    static: {
      directory: "./",
    },
    port: 3000,
    open: true,
    hot: true,
  },
};
