const express = require("express");
const asyncErrorHandler = require("express-async-handler");
const AuthServices = require("./auth.services");
const passport = require("passport");
// Middlewares
const registerValidator = require("@middlewares/registerValidator");
const loginValidator = require("@middlewares/loginValidator");
const {
    ensureAuthenticated,
    forwardAuthenticated,
} = require("@middlewares/auth");

const router = express.Router();
const authServices = new AuthServices();

router.post(
    "/login",
    forwardAuthenticated,
    loginValidator,
    passport.authenticate("local", {
        failWithError: true, // Error handled by Express Error Handler
    }),
    (req, res, next) => {
        res.status(200).json({ ok: true });
    }
);

router.post(
    "/register",
    forwardAuthenticated,
    registerValidator,
    asyncErrorHandler(async (req, res, next) => {
        await authServices.register(req.body);
        res.status(200).json({ ok: true });
    })
);

router.post("/logout", ensureAuthenticated, (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        return res.status(200).json({ ok: true });
    });
});

module.exports = router;
