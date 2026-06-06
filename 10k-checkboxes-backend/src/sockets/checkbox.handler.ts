import { Server } from "socket.io";
import { CheckboxUpdatePayload } from "../types.ts/checkbox.types.js";
import { checkboxes } from "../store/checkbox.store.js";
import {
  CHECKBOX_UPDATE_RECEIVED,
  CHECKBOX_UPDATE_SENT,
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
} from "../utils/constants.js";

export const registerCheckboxHandlers = (io: Server) => {
  io.on(SOCKET_CONNECT, (socket) => {
    console.log(`Connected: ${socket.id}`);

    socket.on(CHECKBOX_UPDATE_RECEIVED, (payload: CheckboxUpdatePayload) => {
      console.log(
        `[${CHECKBOX_UPDATE_RECEIVED}]-[socket-${socket.id}]-[${JSON.stringify(payload)}]`,
      );

      checkboxes[payload.id - 1] = {
        ...checkboxes[payload.id - 1],
        checked: payload.checked,
      };

      io.emit(CHECKBOX_UPDATE_SENT, payload);

      console.log(`[${CHECKBOX_UPDATE_SENT}]-[${JSON.stringify(payload)}]`);
    });

    socket.on(SOCKET_DISCONNECT, () => {
      console.log(`Disconnected: ${socket.id}`);
    });
  });
};
