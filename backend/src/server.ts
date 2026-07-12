import dotenv from "dotenv";

// Load environment variables BEFORE anything else
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 5000;

// Debug (remove after verifying)
console.log("=================================");
console.log("PORT:", process.env.PORT);
console.log(
  "GROQ Loaded:",
  process.env.GROQ_API_KEY ? "YES ✅" : "NO ❌"
);
console.log("=================================");

app.listen(PORT, () => {
  console.log(`🚀 Pulse API running on http://localhost:${PORT}`);
});