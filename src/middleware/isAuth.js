const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("not authenticated");
    error.statusCode = 401;
    throw error;
  }

  let decodedToken;
  const token = authHeader.split(" ")[1];

  decodedToken = jwt.verify(token, "NeboSecretKeyFromServer");

  if (!decodedToken) {
    const error = new Error("invalid token");
    error.statusCode = 401;

    throw error;
  }

  req.userId = decodedToken.userId;

  next();
};
