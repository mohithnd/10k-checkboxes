import { Server } from "socket.io";
import {
  getCommandRedis,
  getPublisherRedis,
  getSubscriberRedis,
  isRedisEnabled,
} from "../config/redis.js";
import {
  getCheckboxes,
  replaceCheckboxesInMemory,
  updateCheckboxInMemory,
} from "../store/checkbox.store.js";
import {
  CHECKBOX_UPDATE_SENT,
  COUNT,
  REDIS_CHECKBOX_STATE_KEY,
  REDIS_CHECKBOX_UPDATE_CHANNEL,
} from "../utils/constants.js";
import { Checkbox, CheckboxUpdatePayload } from "../types.ts/checkbox.types.js";
import { channel } from "node:diagnostics_channel";

export const seedRedisFromMemory = async () => {
  if (!isRedisEnabled) {
    return;
  }

  const redis = getCommandRedis();

  const state: Record<string, string> = {};

  for (const checkbox of getCheckboxes()) {
    state[String(checkbox.id)] = checkbox.checked ? "1" : "0";
  }

  await redis.hset(REDIS_CHECKBOX_STATE_KEY, state);
};

export const restoreCheckboxesFromRedis = async () => {
  if (!isRedisEnabled) {
    return;
  }

  try {
    const redis = getCommandRedis();

    const savedState = await redis.hgetall(REDIS_CHECKBOX_STATE_KEY);

    const hasSavedState = Object.keys(savedState).length > 0;

    if (!hasSavedState) {
      await seedRedisFromMemory();
      console.log("Redis checkbox state initialized from backend memory");
      return;
    }

    const restoredCheckboxes: Checkbox[] = Array.from(
      { length: COUNT },
      (_, index) => {
        const id = index + 1;

        return {
          id,
          checked: savedState[String(id)] === "1",
        };
      },
    );

    replaceCheckboxesInMemory(restoredCheckboxes);

    console.log("Checkbox state restored from Redis");
  } catch (error) {
    console.warn("Failed to restore checkbox state from Redis", error);
  }
};

export const publishCheckboxUpdateToRedis = async (
  payload: CheckboxUpdatePayload,
) => {
  if (!isRedisEnabled) {
    return;
  }

  try {
    const redis = getCommandRedis();

    const publisher = getPublisherRedis();

    await redis.hset(
      REDIS_CHECKBOX_STATE_KEY,
      String(payload.id),
      payload.checked ? "1" : "0",
    );

    await publisher.publish(
      REDIS_CHECKBOX_UPDATE_CHANNEL,
      JSON.stringify(payload),
    );
  } catch (error) {
    console.warn("Failed to publish checkbox update to Redis", error);
  }
};

export const subscribeToRedisChecboxUpdates = async (io: Server) => {
  if (!isRedisEnabled) {
    return;
  }

  try {
    const subscriber = getSubscriberRedis();

    await subscriber.subscribe(REDIS_CHECKBOX_UPDATE_CHANNEL);

    subscriber.on("message", (channel, message) => {
      if (channel !== REDIS_CHECKBOX_UPDATE_CHANNEL) {
        return;
      }

      try {
        const payload = JSON.parse(message) as CheckboxUpdatePayload;

        updateCheckboxInMemory(payload);

        io.emit(CHECKBOX_UPDATE_SENT, payload);
      } catch (error) {
        console.warn("Invalid Redis checkbox update message", error);
      }
    });

    console.log("Subscribed to Redis checkbox updates");
  } catch (error) {
    console.warn("Failed to subscribe to Redis checkbox updates", error);
  }
};
