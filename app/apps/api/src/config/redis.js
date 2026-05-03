const IORedis = require("ioredis");
const env = require("./env");

const redisConnection = new IORedis({
  host: env.redisHost,
  port: env.redisPort,
  username: "default",
  password: process.env.REDIS_PASSWORD,
  tls: process.env.REDIS_TLS === "true" ? {} : undefined,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

redisConnection.on("connect", () => {
  console.log("Redis connected");
});

redisConnection.on("error", (err) => {
  console.error("Redis error:", err.message);
});

module.exports = redisConnection;