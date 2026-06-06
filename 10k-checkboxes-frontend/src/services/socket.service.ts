import { io } from "socket.io-client";
import { ENV } from "../config/env";

export const socket = io(`${ENV.WS_URL}`);
