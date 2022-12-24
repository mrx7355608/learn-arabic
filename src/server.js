import "dotenv/config";
import http from "http";
import app from "./app.js";
import config from "./config/index.js";
import { connectDb } from "./utils/dbConnection.js";

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
