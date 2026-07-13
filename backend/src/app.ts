import dotenv from "dotenv";
dotenv.config();
import notificationRoutes from "./routes/notificationRoutes";
import activityRoutes from "./routes/activityRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import express from "express";
import aiRoutes from "./routes/aiRoutes";
import oauthRoutes from "./routes/oauthRoutes";
import passport from "./config/passport";
import session from "express-session";
import cors from "cors";

const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
      "http://192.168.29.11:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/oauth", oauthRoutes);
app.use(
  session({
    secret: process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Health Check Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Pulse API 🚀",
  });
});

export default app;