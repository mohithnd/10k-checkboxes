import { Server } from "socket.io";
import { CheckboxUpdatePayload } from "../types.ts/checkbox.types.js";
import { checkboxes } from "../store/checkbox.store.js";

export const registerCheckboxHandlers = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`Connected: ${socket.id}`);

    socket.on(
      "browser:server::checkbox:update",
      (payload: CheckboxUpdatePayload) => {
        console.log(
          `[browser:server::checkbox:update]-[socket-${socket.id}]-[${JSON.stringify(payload)}]`,
        );

        checkboxes[payload.id - 1] = {
          ...checkboxes[payload.id - 1],
          checked: payload.checked,
        };

        io.emit("server:browser::checkbox:update", payload);

        console.log(
          `[server:browser::checkbox:update]-[${JSON.stringify(payload)}]`,
        );
      },
    );

    socket.on("disconnect", () => {
      console.log(`Disconnected: ${socket.id}`);
    });
  });
};
