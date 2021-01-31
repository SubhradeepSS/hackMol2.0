const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let decodedToken;
  try {
    decodedToken = req.cookies.token;
    // console.log(decodedToken);
    decodedToken = jwt.verify(decodedToken, "somesupersecretsecret");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  if (decodedToken.userId) req.userId = decodedToken.userId;
  else req.collegeId = decodedToken.collegeId;

  next();
};
