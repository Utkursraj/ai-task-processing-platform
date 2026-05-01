const app = require("./app");
const connectDB = require("./config/db");
const env = require("./config/env");


require("./queue/worker");

async function start() {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`API running on port ${env.port}`);
  });
}

start().catch((err) => {
  console.error("Failed to start API", err);
  process.exit(1);
});