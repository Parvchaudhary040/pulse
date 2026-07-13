import { Router } from "express";
import passport from "../config/passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173",
  }),
  (req, res) => {
    res.json({
      message: "Google callback reached successfully",
      user: req.user,
    });
  }
);

export default router;