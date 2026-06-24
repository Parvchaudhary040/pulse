import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pulse_db",
  password: "postgres123",
  port: 5432,
});