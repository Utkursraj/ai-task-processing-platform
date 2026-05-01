const IORedis = require("ioredis");
const env = require("./env");

const redisConnection = new IORedis({
  host: env.redisHost,
  port: env.redisPort,
  maxRetriesPerRequest: null,
});

module.exports = redisConnection;