import { Request, Response } from "express";

export const googleCallback = (req: Request, res: Response) => {
  return completeOAuthLogin(req, res, "google");
};

export const githubCallback = (req: Request, res: Response) => {
  return completeOAuthLogin(req, res, "github");
};

const completeOAuthLogin = (
  req: Request,
  res: Response,
  provider: "google" | "github"
) => {
  const result = req.user as {
    token: string;
    user: any;
  };

  if (!result) {
    return res.redirect(
      `${process.env.FRONTEND_URL}/login?error=${provider}_auth_failed`
    );
  }

  return res.redirect(
    `${process.env.FRONTEND_URL}/oauth-success?token=${result.token}`
  );
};
