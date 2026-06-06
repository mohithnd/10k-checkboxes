import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { registerCheckboxHandlers } from "./checkbox.handler.js";

export const createSocketServer = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  registerCheckboxHandlers(io);

  return io;
};
