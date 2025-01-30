import { generateJWTToken_email, generateJWTToken_username } from "../utils/generateJWTToken.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";
import { UnRegisteredUser } from "../models/unRegisteredUser.model.js";
import dotenv from "dotenv";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

// Initiate Google OAuth
export const googleAuthHandler = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Google callback, if login fails → send to login
export const googleAuthCallback = passport.authenticate("google", {
  failureRedirect: process.env.CLIENT_URL + "/login",
  session: false,
});

export const handleGoogleLoginCallback = asyncHandler(async (req, res) => {
  console.log("\n******** Inside handleGoogleLoginCallback function ********");

  // Check if user already exists
  const existingUser = await User.findOne({ email: req.user._json.email });

  if (existingUser) {
    // Generate token for existing user
    const jwtToken = generateJWTToken_username(existingUser);
    const expiryDate = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour
    res.cookie("accessToken", jwtToken, { httpOnly: true, expires: expiryDate, secure: false });

    // ✅ Redirect to /profile/:username instead of /discover
    return res.redirect(`${process.env.CLIENT_URL}/profile/${existingUser.username}`);
  }

  // Handle unregistered user
  let unregisteredUser = await UnRegisteredUser.findOne({ email: req.user._json.email });
  if (!unregisteredUser) {
    console.log("Creating new Unregistered User");
    unregisteredUser = await UnRegisteredUser.create({
      name: req.user._json.name,
      email: req.user._json.email,
      picture: req.user._json.picture,
    });
  }
  // Token for unregistered user
  const jwtToken = generateJWTToken_email(unregisteredUser);
  const expiryDate = new Date(Date.now() + 0.5 * 60 * 60 * 1000); // 30 minutes
  res.cookie("accessTokenRegistration", jwtToken, { httpOnly: true, expires: expiryDate, secure: false });

  // ✅ Unregistered user → register page
  return res.redirect(`${process.env.CLIENT_URL}/register`);
});

// Logout clears the token cookie
export const handleLogout = (req, res) => {
  console.log("\n******** Inside handleLogout function ********");
  res.clearCookie("accessToken");
  return res.status(200).json(new ApiResponse(200, null, "User logged out successfully"));
};
