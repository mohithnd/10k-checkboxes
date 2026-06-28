import { Server } from "socket.io";
import { CheckboxUpdatePayload } from "../types.ts/checkbox.types.js";
import { checkboxes, updateCheckboxInMemory } from "../store/checkbox.store.js";
import {
  CHECKBOX_UPDATE_RECEIVED,
  CHECKBOX_UPDATE_SENT,
  COUNT,
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
} from "../utils/constants.js";
import { publishCheckboxUpdateToRedis } from "../redis/checkbox.redis.js";

const isValidCheckboxUpdatePayload = (
  payload: unknown,
): payload is CheckboxUpdatePayload => {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const data = payload as CheckboxUpdatePayload;

  return (
    Number.isInteger(data.id) &&
    data.id >= 1 &&
    data.id <= COUNT &&
    typeof data.checked === "boolean"
  );
};

export const registerCheckboxHandlers = (io: Server) => {
  io.on(SOCKET_CONNECT, (socket) => {
    console.log(`Connected: ${socket.id}`);

    socket.on(CHECKBOX_UPDATE_RECEIVED, (payload: unknown) => {
      if (!isValidCheckboxUpdatePayload(payload)) {
        console.warn(
          `Invalid checkbox update from socket ${socket.id}`,
          payload,
        );
        return;
      }

      console.log(
        `[${CHECKBOX_UPDATE_RECEIVED}]-[socket-${socket.id}]-[${JSON.stringify(payload)}]`,
      );

      updateCheckboxInMemory(payload);

      io.emit(CHECKBOX_UPDATE_SENT, payload);

      console.log(`[${CHECKBOX_UPDATE_SENT}]-[${JSON.stringify(payload)}]`);

      void publishCheckboxUpdateToRedis(payload);
    });

    socket.on(SOCKET_DISCONNECT, () => {
      console.log(`Disconnected: ${socket.id}`);
    });
  });
};
