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
    if (err.name === "AuthenticationError")
        return res.status(400).json({ error: err.message });
    if (err.name === "JsonWebTokenError")
        return res.status(400).json({ error: "Invalid token" });
    if (err.name === "TokenExpiredError")
        return res
            .status(400)
            .json({ error: "Token has expired, request again" });

    return res.status(code).json({ error: err.message });
};
