import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(PORT) || PORT <= 0) {
  throw new Error("Invalid PORT");
}

export const ENV = {
  PORT,
  REDIS_URL: process.env.REDIS_URL ?? "redis://localhost:6379",
};
