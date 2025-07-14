import { config } from "dotenv";
import process from "process";

config({
  path: `.env.local`,
  quiet: true,
});
export const { PORT, NODE_ENV, DB_URI } = process.env;
