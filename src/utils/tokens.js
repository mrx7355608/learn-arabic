const jwt = require("jsonwebtoken");
const config = require("@config/index");

const createToken = (id) => {
    const token = jwt.sign({ id }, config.TOKEN_SECRET, { expiresIn: "5m" });
    return token;
};

const verifyToken = (token) => {
    return jwt.verify(token, config.TOKEN_SECRET);
};

module.exports = { createToken, verifyToken };
