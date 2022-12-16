const passport = require("passport");

module.exports = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        console.log({ err, user, info });
        if (err) return next(err);
        if (info) return next(new ApiError(info.message, 400));
        req.login(user, (err) => {
            if (err) return next(err);
            return res.status(200).json({ ok: true });
        });
    })(req, res, next);
};
