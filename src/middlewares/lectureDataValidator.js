// const ApiError = require("@utils/ApiError");
const asyncErrorHandler = require("express-async-handler");
const lectureValidationSchema = require("@api/lectures/lectures.schemas");

module.exports = asyncErrorHandler(async (req, res, next) => {
    await lectureValidationSchema.validateAsync(req.body);
    return next();
});
