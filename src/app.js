const express = require("express");
const helmet = require("helmet");
const hpp = require("hpp");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const ApiError = require("@utils/ApiError");
const errorHandler = require("@middlewares/errorHandler");
const MongoDbStore = require("connect-mongodb-session")(session);
const config = require("@config/index");
const passportSetup = require("@utils/passportSetup");

// Routers
const lectureRouter = require("@api/lectures/lectures.routes");

const app = express();

// App setup
app.use(morgan("dev"));
app.use(hpp());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express session setup
// MongoDb session store
const mongoStore = new MongoDbStore({
    collection: "sessions",
    uri: config.DB_URL,
});
mongoStore.on("error", (err) => console.log(err));
app.use(
    session({
        secret: config.SESSION_SECRET,
        resave: false, // saves sessions even if they are not modified
        saveUninitialized: false, // saves newly created sessions in storage
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
        store: mongoStore,
    })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
passportSetup(passport);

// Routes setup
app.use("/api/v1/lectures", lectureRouter);

// Catch 404
app.use((req, res, next) => {
    return next(new ApiError("Page not found", 404));
});

// Error Handler
app.use(errorHandler);

module.exports = app;
