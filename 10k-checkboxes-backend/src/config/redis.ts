import { Redis } from "ioredis";
import { ENV } from "./env.js";

let commandRedis: Redis | null = null;
let publisherRedis: Redis | null = null;
let subscriberRedis: Redis | null = null;

let redisEnabled = false;

const createRedisClient = () => {
  return new Redis(ENV.REDIS_URL, {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,

    retryStrategy(times: number) {
      if (times > 3) {
        return null;
      }

      return Math.min(times * 100, 1000);
    },
  });
};

export const connectRedis = async (): Promise<boolean> => {
  try {
    commandRedis = createRedisClient();
    publisherRedis = createRedisClient();
    subscriberRedis = createRedisClient();

    commandRedis.on("ready", () => {
      redisEnabled = true;
      console.log("Redis command client ready");
    });

    publisherRedis.on("ready", () => {
      redisEnabled = true;
      console.log("Redis publisher client ready");
    });

    subscriberRedis.on("ready", () => {
      redisEnabled = true;
      console.log("Redis subscriber client ready");
    });

    commandRedis.on("error", (error: Error) => {
      redisEnabled = false;
      console.log("Redis command client error:", error.message);
    });

    publisherRedis.on("error", (error: Error) => {
      redisEnabled = false;
      console.log("Redis publisher client error:", error.message);
    });

    subscriberRedis.on("error", (error: Error) => {
      redisEnabled = false;
      console.log("Redis subscriber client error:", error.message);
    });

    commandRedis.on("end", () => {
      redisEnabled = false;
      console.log("Redis command client ended");
    });

    publisherRedis.on("end", () => {
      redisEnabled = false;
      console.log("Redis publisher client ended");
    });

    subscriberRedis.on("end", () => {
      redisEnabled = false;
      console.log("Redis subscriber client ended");
    });

    await Promise.all([
      commandRedis.connect(),
      publisherRedis.connect(),
      subscriberRedis.connect(),
    ]);

    redisEnabled = true;

    console.log("Redis Connected");

    return true;
  } catch (error) {
    redisEnabled = false;

    console.log("Redis not available. Running backend with local memory only.");

    commandRedis?.disconnect();
    publisherRedis?.disconnect();
    subscriberRedis?.disconnect();

    commandRedis = null;
    publisherRedis = null;
    subscriberRedis = null;

    return false;
  }
};

export const isRedisEnabled = () => {
  return (
    redisEnabled &&
    commandRedis?.status === "ready" &&
    publisherRedis?.status === "ready" &&
    subscriberRedis?.status === "ready"
  );
};

export const getCommandRedis = () => {
  if (!commandRedis) {
    throw new Error("Redis command client not initialized");
  }

  return commandRedis;
};

export const getPublisherRedis = () => {
  if (!publisherRedis) {
    throw new Error("Redis publisher client not initialized");
  }

  return publisherRedis;
};

export const getSubscriberRedis = () => {
  if (!subscriberRedis) {
    throw new Error("Redis subscriber client not initialized");
  }

  return subscriberRedis;
};
