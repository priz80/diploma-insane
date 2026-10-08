const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./admin.js",
  output: {
    filename: "admin.js",
    path: path.resolve(__dirname),
  },
  mode: "development",
  devServer: {
    static: {
      directory: "./",
    },
    port: 3000,
    open: true,
    hot: true,
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:4545",
        pathRewrite: { "^/api": "" },
      },
    ],
  },
};
