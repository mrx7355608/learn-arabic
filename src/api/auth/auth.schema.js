const joi = require("joi");

const registerSchema = joi.object({
    fname: joi.string().required().min(3).messages({
        "any.required": "First name is required",
        "string.base": "First name should be a text value",
        "string.min": "First name should be 3 characters long at least",
        "string.empty": "First name cannot be empty",
    }),
    lname: joi.string().required().min(3).messages({
        "any.required": "Last name is required",
        "string.base": "Last name should be a text value",
        "string.min": "Last name should be 3 characters long at least",
        "string.empty": "Last name cannot be empty",
    }),
    email: joi.string().required().email().messages({
        "any.required": "Email is required",
        "string.base": "Email should be a text value",
        "string.empty": "Email cannot be empty",
        "string.email": "Invalid email",
    }),
    password: joi.string().required().min(10).messages({
        "any.required": "Password is required",
        "string.base": "Password should be a text value",
        "string.min": "Password too short, 10 characters are minimum",
        "string.empty": "Password cannot be empty",
    }),
    confirmPassword: joi.valid(joi.ref("password")).required().messages({
        "any.only": "Passwords do not match",
        "any.required": "Confirm your password to continue.",
    }),
});

const loginSchema = joi.object({
    email: joi.string().required().email().messages({
        "any.required": "Email is required!",
        "string.base": "Email should be a text value",
        "string.empty": "Email cannot be empty",
        "string.email": "Invalid email",
    }),
    password: joi.string().required().messages({
        "any.required": "Password is required!",
        "string.base": "Password should be a text value",
        "string.empty": "Password cannot be empty",
    }),
});

module.exports = { registerSchema, loginSchema };
