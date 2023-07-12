const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const { UnauthorizedError } = require("../utils/errors");

const jwtFrom = ({ headers }) => {
  if (headers?.authorization) {
    const [scheme, token] = headers.authorization.split(" ");
    if (scheme.trim() === "Bearer") {
      return token;
    }
  }
  return undefined;
};

const extractUserFromJwt = (req, res, next) => {
  try {
    const token = jwtFrom(req);

    if (token) {
      const decodedToken = jwt.verify(token, secretKey);
      res.locals.user = decodedToken;
      console.log("Decoded User:", res.locals.user);

      // Add the user ID to the request
      const userId = decodedToken.id;

      // Add the user ID to the response headers
      res.locals.userId = userId;
    }

    return next();
  } catch (error) {
    console.error("Error:", error);
    return next();
  }
};

const requireAuthenticatedUser = (req, res, next) => {
  try {
    const { user } = res.locals;
    console.log(user);
    if (!user?.email) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (error) {
    console.error("Error:", error);
    return next(error);
  }
};

module.exports = {
  extractUserFromJwt,
  requireAuthenticatedUser
};
