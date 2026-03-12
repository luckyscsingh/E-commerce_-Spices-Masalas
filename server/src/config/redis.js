const Redis = require("ioredis");

let redis;

try {
  redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      if (times > 3) {
        console.warn("Redis: Max retries reached. Giving up.");
        return null;
      }
      return Math.min(times * 200, 2000);
    },
    lazyConnect: true,
  });

  redis.on("connect", () => {
    console.log("Redis Connected");
  });

  redis.on("error", (err) => {
    console.warn(`Redis connection error: ${err.message}`);
  });
} catch (error) {
  console.warn(`Redis initialization failed: ${error.message}`);
  redis = null;
}

module.exports = redis;
