import authRoutes from "./routes/authRoutes";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://192.168.29.11:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Pulse API 🚀",
  });
});

export default app;