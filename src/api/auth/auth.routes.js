const express = require("express");
const asyncErrorHandler = require("express-async-handler");
const AuthServices = require("./auth.services");
const loginWithPassport = require("@utils/loginWithPassport");
// Middlewares
const {
    ensureAuthenticated,
    forwardAuthenticated,
    registerDataValidator,
    loginDataValidator,
} = require("@middlewares/auth");

// Auth router
const router = express.Router();
const authServices = new AuthServices();

// 1) LOGIN
router.post(
    "/login",
    forwardAuthenticated,
    loginDataValidator,
    (req, res, next) => {
        loginWithPassport(req, res, next);
    }
);

// 2) REGISTER
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

// 3) LOGOUT
router.post("/logout", ensureAuthenticated, (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        return res.status(200).json({ ok: true });
    });
});

module.exports = router;
