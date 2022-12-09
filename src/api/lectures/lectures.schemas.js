const joi = require("joi");

const lectureValidationSchema = joi.object({
    title: joi.string().required().min(5).messages({
        "any.required": "Title is required!",
        "string.base": "Please enter a valid title",
        "string.empty": "Title cannot be empty.",
        "string.min": "Title cannot be shorter than 5 characters",
    }),
});
