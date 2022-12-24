// TODO: Add rate limiting
const express = require("express");
const asyncErrorHandler = require("express-async-handler");
const AuthServices = require("../api/auth/auth.services");
const UserDb = require("@api/users/user.data");
const passport = require("passport");
const {
    ensureAuthenticated,
    forwardAuthenticated,
    registerDataValidator,
    loginDataValidator,
} = require("@middlewares/auth");
const ApiError = require("@utils/ApiError");

const router = express.Router();
const userDb = new UserDb();
const authServices = new AuthServices(userDb);

// Register
router.post(
    "/register",
    forwardAuthenticated,
    registerDataValidator,
    asyncErrorHandler(async (req, res, next) => {
        await authServices.register(req.body);
        const message = "A verification email has been to your email.";
        res.status(200).json({ message });
    })
);

// Login
router.post(
    "/login",
    forwardAuthenticated,
    loginDataValidator,
    (req, res, next) => {
        // Login with passportjs
        passport.authenticate("local", (err, user, info) => {
            if (err) return next(err);
            if (info) return next(new ApiError(info.message, 400));

            req.login(user, (err) => {
                if (err) return next(err);
                return res.status(200).json({ login: true });
            });
        })(req, res, next);
    }
);

// Logout
router.post("/logout", ensureAuthenticated, (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        return res.status(200).json({ logout: true });
    });
});

// Verify email
router.get(
    "/verify-email",
    asyncErrorHandler(async (req, res, next) => {
        const { token } = req.query;
        await authServices.verifyEmail(token);
        return res.status(200).json({ verified: true });
    })
);

// Resend verification email
router.post(
    "/resend-verification-email",
    asyncErrorHandler(async (req, res, next) => {
        const email = req.body.email;
        await authServices.resendVerificationEmail(email);
        return res.status(200).json({
            message: `A verification email has been sent successfully to ${email}`,
        });
    })
);

router.post(
    "/forgot-password",
    asyncErrorHandler(async (req, res, next) => {
        await authServices.forgotPassword(req.body.email);
        const message = `Password reset link has been sent successfully to your email at ${req.body.email}`;
        return res.status(200).json({ message });
    })
);

router.post(
    "/reset-password",
    asyncErrorHandler(async (req, res, next) => {
        await authServices.resetPassword(req.query.token, req.body.newPassword);
        const message = "Password has been reset, login to continue";
        return res.status(200).json({ message });
    })
);

module.exports = router;
