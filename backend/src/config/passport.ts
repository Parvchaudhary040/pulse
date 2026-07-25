import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as oauthService from "../services/oauthService";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_REDIRECT_URI!,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const user = await oauthService.googleLogin(profile);

        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

export default passport;