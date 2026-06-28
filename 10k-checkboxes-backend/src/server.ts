import http from "http";
import { app } from "./app.js";
import { createSocketServer } from "./sockets/socket.js";
import { ENV } from "./config/env.js";
import { connectRedis } from "./config/redis.js";
import {
  restoreCheckboxesFromRedis,
  subscribeToRedisChecboxUpdates,
} from "./redis/checkbox.redis.js";

const bootstrap = async () => {
  await connectRedis();

  await restoreCheckboxesFromRedis();

  const httpServer = http.createServer(app);

  const io = createSocketServer(httpServer);

  await subscribeToRedisChecboxUpdates(io);

  httpServer.listen(ENV.PORT, () => {
    console.log(`Server running on ${ENV.PORT}`);
  });
};

bootstrap().catch((error) => {
  console.error("Failed to start backend", error);
  process.exit(1);
});
