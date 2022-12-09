const config = require("@config/index")

module.exports = (err, req, res, next) => {
  const code = err.statusCode || 500;

  if (config.NODE_ENV === "development") {
    return res.status(code).json({ error: err.message, stack: err.stack })
  }

  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid Id" })
  }
  
  return res.status(code).json({ error: err.message })
}
