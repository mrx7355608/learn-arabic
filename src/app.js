const express = require("express");
const helmet = require("helmet");
const hpp = require("hpp");
const morgan = require("morgan");
const cors = require("cors");
const ApiError = require("@utils/ApiError");
const errorHandler = require("@middlewares/errorHandler");

const app = express();

// App setup
app.use(morgan("dev"));
app.use(hpp());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes setup

// Catch 404
app.use((req, res, next) => {
  return next(new ApiError("Resource not found", 404));
});

// Error Handler
app.use(errorHandler);

module.exports = app;
