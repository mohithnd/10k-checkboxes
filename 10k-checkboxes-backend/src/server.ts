import http from "http";
import { app } from "./app.js";
import { createSocketServer } from "./sockets/socket.js";
import { ENV } from "./config/env.js";

const httpServer = http.createServer(app);

createSocketServer(httpServer);

httpServer.listen(ENV.PORT, () => {
  console.log(`Server running on ${ENV.PORT}`);
});
