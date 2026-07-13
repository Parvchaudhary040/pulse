import "dotenv/config";

import app from "./app";

const PORT = process.env.PORT || 5000;

console.log("Google Client:",
  process.env.GOOGLE_CLIENT_ID ? "Loaded ✅" : "Missing ❌"
);

app.listen(PORT, () => {
  console.log(
    `🚀 Pulse API running on http://localhost:${PORT}`
  );
});