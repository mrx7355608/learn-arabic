require("dotenv/config");
require("module-alias/register");
const http = require("http");
const app = require("./app");
const config = require("@config/index");
const { connectDb } = require("@utils/dbConnection");

const httpServer = http.createServer(app);
const port = config.PORT || 8000;

const startServer = () => {
    // Connect to database
    connectDb(config.DB_URL);
    httpServer.listen(port, () => {
        console.log("express server started on port", port);
    });
};

startServer();
