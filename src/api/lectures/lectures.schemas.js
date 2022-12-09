const joi = require("joi");

const materialValidationSchema = joi.object({
	topic: joi.string().required(),
	studyFrom: joi.string().required()
});

const lectureValidationSchema = joi.object({
    title: joi.string().required().min(5).messages({
        "any.required": "Title is required!",
        "string.base": "Enter a valid title",
        "string.empty": "Title cannot be empty.",
        "string.min": "Title cannot be shorter than 5 characters",
    }),
    topics: joi.array().required().items(joi.string()).min(1).messages({
        "any.required": "Topics are required!",
        "array.base": "Topics contain an invalid value",
        "array.empty": "Topics cannot be empty.",
        "array.min": "Add one topic at least",
    }),
	summary: joi.string().required().min(20).messages({
        "any.required": "Summary is required!",
        "string.base": "Enter a valid summary",
        "string.empty": "Summary cannot be empty.",
        "string.min": "Summary cannot be shorter than 20 characters",
    }),
	homework: joi.string().min(10).messages({
        "string.base": "Homework seems to be invalid",
        "string.empty": "Homework cannot be empty.",
        "string.min": "Homework cannot be shorter than 10 characters",
    }),
	keyPoints: joi.array().required().items(joi.string()).min(1).messages({
        "any.required": "Key points are required!",
        "array.base": "Key points contain an invalid value",
        "array.empty": "Key points cannot be empty.",
        "array.min": "There should one point at least",
    }),
	material: joi.array().required().items(materialValidationSchema).messages({
		"any.required": "Lectures cannot be created without class material",
        "array.base": "There seems to be an invalid value in class material",
        "array.empty": "Class material cannot be empty.",
        "array.min": "At least add material about one topic you taught in class",
	})
});

module.exports = lectureValidationSchema;