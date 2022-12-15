const config = require("@config/index");

module.exports = (err, req, res, next) => {
    const code = err.statusCode || 500;

    if (config.NODE_ENV === "development") {
        return res.status(code).json({ error: err.message, stack: err.stack });
    }

    if (err.name === "CastError")
        return res.status(400).json({ error: "Invalid Id" });
    if (err.name === "ValidationError")
        return res.status(400).json({ error: err.message });
    if (err.name === "AuthenticationError") {
        const message =
            err.message === "Unauthorized"
                ? "Incorrect email or password"
                : "Invalid data";
        return res.status(400).json({ error: message });
    }

    return res.status(code).json({ error: err.message });
};
