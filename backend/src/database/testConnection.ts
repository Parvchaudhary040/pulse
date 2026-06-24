import { pool } from "./db";

async function testDB() {
  try {
    const result = await pool.query("SELECT NOW()");

    console.log("✅ Database Connected");
    console.log(result.rows[0]);
  } catch (error) {
    console.error("❌ Database Error");
    console.error(error);
  } finally {
    await pool.end();
  }
}

testDB();