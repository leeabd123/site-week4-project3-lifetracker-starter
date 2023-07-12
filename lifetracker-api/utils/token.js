const jwt = require("jsonwebtoken");
const { secretKey } = require('../config');

const generateToken = (data) => jwt.sign(data, secretKey, { algorithm: "HS256", expiresIn: 10000 });

const createUserJwt = (user) => {
  const payload = {
    id: user.id,
    email: user.email
  };
  return generateToken(payload);
};

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return {};
  } 
};

const testTokens = () => {
  const user = { email: "personal@gmail.com" };
  const token = generateToken(user);
  const validatedToken = validateToken(token);  
};

testTokens();

module.exports = {
  generateToken,
  validateToken,
  createUserJwt
};
