import { Request, Response } from "express";

export const googleCallback = (req: Request, res: Response) => {
  const result = req.user as {
    token: string;
    user: any;
  };

  if (!result) {
    return res.redirect(
      `${process.env.FRONTEND_URL}/login?error=google_auth_failed`
    );
  }

  return res.redirect(
    `${process.env.FRONTEND_URL}/oauth-success?token=${result.token}`
  );
};