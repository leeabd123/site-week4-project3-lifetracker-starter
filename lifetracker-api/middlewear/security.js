const jwt = require('jsonwebtoken')
const { secretKey } = require('../config')
const { UnauthorizedError } = require("../utils/errors");


//create a function to extract the JWT from the request header
const jwtFrom = ({ headers }) => {

    if (headers?.authorization) {

        const [scheme, token] = headers.authorization.split(" ")
        if (scheme.trim() === "Bearer") {
            return token
        }
    }
    return undefined
}

const extractUserFromJwt = (req, res, next) => {
    try {
      const token = jwtFrom(req);
      console.log("Token:", token);
      if (token) {
        res.locals.user = jwt.verify(token, secretKey);
        console.log("Decoded User:", res.locals.user);
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
}