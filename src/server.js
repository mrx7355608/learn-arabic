require("dotenv/config");
require("module-alias/register");
const http = require("http");
const app = require("./app");
const config = require("@config/index");

const httpServer = http.createServer(app);
const port = config.PORT || 8000;

const startServer = () => {
  httpServer.listen(port, () => {
    console.log("express server started on port", port)
  });
}

startServer()