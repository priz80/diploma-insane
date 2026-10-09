const path = require("path");
const fs = require("fs");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devServer: {
    hot: true,
    static: {
      directory: "./dist",
      watch: true,
    },
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:4545",
        pathRewrite: { "^/api": "" },
      },
    ],
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) return middlewares;
      
      middlewares.push({
        name: "serve-db",
        path: "/db",
        middleware: (req, res) => {
          const filePath = path.join(__dirname, req.url);
          try {
            const data = fs.readFileSync(filePath);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
          } catch (e) {
            res.writeHead(404);
            res.end("Not found");
          }
        }
      });
      
      return middlewares;
    }
  },
};
