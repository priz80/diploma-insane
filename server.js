const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db", "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(router);

const port = 4545;
server.listen(port, "0.0.0.0", () => {
  console.log(`JSON Server is running on port ${port}`);
});
