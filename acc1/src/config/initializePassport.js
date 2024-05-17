const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userService = require("../models/user.model");
const { createHash, isValidPassword } = require("../utils/utils");

const initializePassport = () => {
  passport.use('register', new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
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
          role: email === "adminCoder@coder.com" ? "admin" : "user"
        };
        let result = await userService.create(newUser);
        return done(null, result);
      } catch (error) {
        return done(error);
      }
    }
  ));

  passport.use('login', new LocalStrategy(
   { usernameField: 'email' },
   async (email, password, done) => {
     try {
       console.log("Finding user with email:", email);
       const user = await userService.findOne({ email: email });
       if (!user) {
         return done(null, false, { message: 'Invalid email or password' });
       }
       console.log("User found:", user);
       console.log("Comparing provided password with stored password");
       const isMatch = isValidPassword({ userPassword: user.password, password });
       if (!isMatch) {
         return done(null, false, { message: 'Invalid email or password' });
       }
       return done(null, user);
     } catch (error) {
       return done(error);
     }
   }
 ));
 

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
