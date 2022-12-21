const asyncErrorHandler = require("express-async-handler");
const ApiError = require("@utils/ApiError");
const { registerSchema, loginSchema } = require("@api/auth/auth.schema");

module.exports = {
    // only allows authenticated users
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) return next();
        throw new ApiError("Un-authorized", 401);
    },

    isAdmin: (req, res, next) => {
        if (req.user.role === "admin") return next();
        return next(new ApiError("Only admins can access this route", 403));
    },

    // Redirect / Prevent logged in user
    // from accessing login, register etc pages
    forwardAuthenticated: (req, res, next) => {
        if (!req.isAuthenticated()) return next();
        throw new ApiError("Not allowed", 400);
    },

    loginDataValidator: asyncErrorHandler(async (req, res, next) => {
        await loginSchema.validateAsync(req.body);
        return next();
    }),

    registerDataValidator: asyncErrorHandler(async (req, res, next) => {
        await registerSchema.validateAsync(req.body);
        return next();
    }),
};
