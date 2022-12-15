const asyncErrorHandler = require("express-async-handler");
const ApiError = require("@utils/ApiError");

module.exports = {
    // only allows authenticated users
    ensureAuthenticated: asyncErrorHandler((req, res, next) => {
        if (req.isAuthenticated()) return next();
        throw new ApiError("Un-authorized", 401);
    }),

    // Redirect / Prevent logged in user
    // from accessing login, register etc pages
    forwardAuthenticated: asyncErrorHandler((req, res, next) => {
        if (!req.isAuthenticated()) return next();
        throw new ApiError("Not allowed", 400);
    }),
};
