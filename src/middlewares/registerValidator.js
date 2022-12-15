const asyncErrorHandler = require("express-async-handler");
const { registerSchema } = require("@api/auth/auth.schema");

module.exports = asyncErrorHandler(async (req, res, next) => {
    await registerSchema.validateAsync(req.body);
    return next();
});
