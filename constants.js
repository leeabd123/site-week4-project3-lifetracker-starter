export const PRODUCTION_API_BASE_URL = "https://example-api.com"; 

export const DEVELOPMENT_API_BASE_URL = "http://localhost:3001";

export const API_BASE_URL = process.env.NODE_ENV === "production" ? PRODUCTION_API_BASE_URL : DEVELOPMENT_API_BASE_URL;

// module.exports = {
//   PRODUCTION_API_BASE_URL,
//   DEVELOPMENT_API_BASE_URL,
//   API_BASE_URL
// };

