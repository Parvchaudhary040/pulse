import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "Google OAuth environment variables are missing."
  );
}

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_REDIRECT_URI!,
    },
    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

export default passport;