const express = require("express");
const passport = require("passport");
const asyncErrorHandler = require("express-async-handler");
const AuthServices = require("./auth.services");
const ApiError = require("@utils/ApiError");
const {
    ensureAuthenticated,
    forwardAuthenticated,
    registerDataValidator,
    loginDataValidator,
} = require("@middlewares/auth");

// Auth router
const router = express.Router();
const authServices = new AuthServices();

// 1) REGISTER
router.post(
    "/register",
    forwardAuthenticated,
    registerDataValidator,
    asyncErrorHandler(async (req, res, next) => {
        await authServices.register(req.body);
        // TODO: send verification email
        res.status(200).json({ ok: true });
    })
);

// 2) LOGIN
router.post(
    "/login",
    forwardAuthenticated,
    loginDataValidator,
    (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) return next(err);
            if (info) return next(new ApiError(info.message, 400));
            req.login(user, (err) => {
                if (err) return next(err);
                return res.status(200).json({ ok: true });
            });
        })(req, res, next);
    }
);

// 3) LOGOUT
router.post("/logout", ensureAuthenticated, (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        return res.status(200).json({ ok: true });
    });
});

// 4) VERIFY EMAIL
router.get(
    "/verify-email",
    asyncErrorHandler(async (req, res, next) => {
        const { token } = req.query;
        await authServices.verifyEmail(token);
        return res.status(200).json({ verified: true });
    })
);

module.exports = router;
