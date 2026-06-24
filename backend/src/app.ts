import authRoutes from "./routes/authRoutes";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
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