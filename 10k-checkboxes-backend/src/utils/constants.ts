export const BROWSER_TO_SERVER = "browser:server";
export const SERVER_TO_BROWSER = "server:browser";

export const CHECKBOX_UPDATE = "checkbox:update";

export const CHECKBOX_UPDATE_SENT = `${SERVER_TO_BROWSER}::${CHECKBOX_UPDATE}`;
export const CHECKBOX_UPDATE_RECEIVED = `${BROWSER_TO_SERVER}::${CHECKBOX_UPDATE}`;

export const COUNT = 10000;

export const SOCKET_CONNECT = "connection";
export const SOCKET_DISCONNECT = "disconnect";

export const REDIS_CHECKBOX_STATE_KEY = "checkboxes:state";
export const REDIS_CHECKBOX_UPDATE_CHANNEL = "checkboxes:updates";
