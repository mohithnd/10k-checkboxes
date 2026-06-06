import http from "http";
import { app } from "./app.js";
import { createSocketServer } from "./sockets/socket.js";

const PORT = 3000;

const httpServer = http.createServer(app);

createSocketServer(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
