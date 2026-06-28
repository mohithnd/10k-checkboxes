import express from "express";
import cors from "cors";
import { getCheckboxes } from "./store/checkbox.store.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  return res.json({ status: "ok" });
});

app.get("/checkboxes", (_, res) => {
  return res.json(getCheckboxes());
});
