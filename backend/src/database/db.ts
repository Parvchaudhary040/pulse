import { Pool } from "pg";

const useSsl = process.env.DB_SSL === "true" ||
  (process.env.DB_SSL !== "false" && Boolean(process.env.DATABASE_URL));

const connectionOptions = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
    }
  : {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 5432),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
    };

export const pool = new Pool(connectionOptions);
