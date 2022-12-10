const ApiError = require("@utils/ApiError");
const lectureValidationSchema = require("@api/lectures/lectures.schemas");

module.exports = async (req, res, next) => {
    try {
        await lectureValidationSchema.validateAsync(req.body);
    } catch (err) {
        return next(new ApiError(err.message, 400));
    }
};
