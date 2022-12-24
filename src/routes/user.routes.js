const express = require("express");
const { ensureAuthenticated } = require("@middlewares/auth");

const userRouter = express.Router();

userRouter.get("/", ensureAuthenticated, (req, res, next) => {
    return res.status(200).json(req.user);
});

module.exports = userRouter;
