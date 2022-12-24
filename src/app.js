import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import cors from "cors";
// import passport from "passport";
// import session from "express-session";
// import MongoDbStore from "connect-mongodb-session";
// import config from "./config/index.js";
// import passportSetup from "@utils/passportSetup.js";
import mongoSanitize from "express-mongo-sanitize";

// Routes
import lectureRouter from "./routes/lectures.routes.js";

const app = express();

// App setup
app.use(morgan("dev"));
app.use(hpp());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(mongoSanitize());

// Express session setup
// MongoDb session store
// const mongoStore = new MongoDbStore(session)({
//     collection: "sessions",
//     uri: config.DB_URL,
// });
// mongoStore.on("error", (err) => console.log(err));
// app.use(
//     session({
//         secret: config.SESSION_SECRET,
//         resave: false, // saves sessions even if they are not modified
//         saveUninitialized: false, // saves newly created sessions in storage
//         cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
//         store: mongoStore,
//     })
// );

// Passport setup
// app.use(passport.initialize());
// app.use(passport.session());
// passportSetup(passport);

// Routes setup
app.use("/api/v1/lectures", lectureRouter);
// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/user", userRouter);

// Catch 404
// app.use((req, res, next) => {
//     return next(new ApiError("Page not found", 404));
// });

// Error Handler
// app.use(errorHandler);

// module.exports = app;
export default app;
