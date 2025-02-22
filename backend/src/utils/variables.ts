const {
  PORT = 3000,
  NODE_ENV = "development",
  MONGO_URI = "mongodb://localhost:27017/express-mongo",
  JWT_SECRET = "secret",
  JWT_EXPIRE = "30d",
  SECRET_KEY = "secret",
  GOOGLE_CLIENT_ID = "",
  GOOGLE_CLIENT_SECRET = "",
  GOOGLE_REDIRECT_URI = "",
  REFRESH_SECRET = "",
  REFRESH_EXPIRES = "",
} = process.env;

export {
  PORT,
  NODE_ENV,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRE,
  SECRET_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  REFRESH_SECRET,
  REFRESH_EXPIRES,
};
