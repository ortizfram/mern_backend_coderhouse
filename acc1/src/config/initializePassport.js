const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const userService = require("../models/user.model");
const { createHash, isValidPassword } = require("../utils/utils");

const initializePassport = () => {
  /**REGISTER */
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        const { first_name, last_name, age } = req.body;
        try {
          let user = await userService.findOne({ email: email });
          if (user) {
            return done(null, false, { message: "User already exists" });
          }
          const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password),
            age,
            role: email === "adminCoder@coder.com" ? "admin" : "user",
          };
          let result = await userService.create(newUser);
          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  ); 

  /**LOGIN */
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          console.log("Finding user with email:", email);
          const user = await userService.findOne({ email: email });
          if (!user) {
            return done(null, false, { message: "Invalid email or password" });
          }
          console.log("User found:", user);
          console.log("Comparing provided password with stored password");
          const isMatch = isValidPassword({
            userPassword: user.password,
            password,
          });
          if (!isMatch) {
            return done(null, false, { message: "Invalid email or password" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  /**GITHUB AUTH */
  passport.use(
    new GitHubStrategy(
      {
        clientID: "Ov23li1u2DHg4rQ7a2mi",
        clientSecret: "2d7fe2ca0f2b225dd5eb478d43842f141d953857",
        callbackURL: "http://localhost:8080/api/sessions/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userService.findOneAndUpdate(
            { githubId: profile.id },
            {
              $setOnInsert: {
                githubId: profile.id,
                email: profile.emails, // assuming profile.emails is an array
                first_name: profile.displayName,
                // other fields from profile as needed
              },
            },
            { new: true, upsert: true }
          );
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userService.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

module.exports = initializePassport;
