require("dotenv").config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  redisHost: process.env.REDIS_HOST || "localhost",
  redisPort: Number(process.env.REDIS_PORT || 6379),
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
};

const required = ["mongoUri", "jwtSecret"];

for (const key of required) {
  if (!env[key]) {
    throw new Error(`Missing required env variable: ${key}`);
  }
}

module.exports = env;