const asyncErrorHandler = require("express-async-handler");
const { loginSchema } = require("@api/auth/auth.schema");

module.exports = asyncErrorHandler(async (req, res, next) => {
    await loginSchema.validateAsync(req.body);
    return next();
});
