const passport = require("passport");
const User = require("../../models/user.model");
const { createHash, isValidPassword } = require("../../utils/utils");
const jwt = require("jsonwebtoken");
const { sendResetEmail } = require("../../utils/sendEmail");
require('dotenv').config();


const generateJWT = (user) => {
  const payload = { id: user._id, email: user.email, role: user.role };
  const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });
  return token;
};

const home = (req, res) => {
  let user = req.session.user;
  res.render("login", { user: user });
};

// Middleware to protect routes
const middlewareAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send("Authentication error");
    }
    req.user = user;
    next();
  })(req, res, next);
};

const logoutConSession = (req, res) => {
  res.clearCookie("jwt"); // Clear the JWT cookie
  res.redirect("/api/sessions/login"); // Redirect to login page after logout
};
//!REGISTER
const getRegister = (req, res) => {
  res.render("registro", {});
};

const getLogin = (req, res) => {
  res.render("login", {});
};
//!PERFIL
const perfil = (req, res) => {
  const user = req.user;
  res.render("perfil", { user: user });
};
// !FORGOT
const getForgotPassword = (req, res) => {
  res.render("forgotPassword", {});
};
const getResetPassword = (req, res) => {
  res.render("resetPassword", {});
};

const postForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

   //send email to reset pass
   console.log("sending email..")
   console.log(process.env.JWT_SECRET)
   const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
   const link = `http://localhost:8080/api/sessions/reset_password/${user._id.toString()}/${token}`;
    console.log("Generated reset password link:", link);
   await sendResetEmail(
    email,
    "Password Reset",
    "Sending Reset password Token, click the button for password changing",
    `<button><a href="${link}">Go to Reset Password</a></button>`
  );

  res
    .status(200)
    .json({ message: "Password reset email sent, check your mailbox." });
  } catch (error) {
    console.error("Password reset email error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getForgotSent = async (req, res) => res.render("forgotSent",{})
//!RESET
const postResetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const hashedPassword = createHash(password);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//!
const loginUser = (req, res) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      const token = generateJWT(user);
      console.log("token: ", token);
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
      }); // Adjust 'secure' according to your environment
      return res.json({ message: "Logged in successfully" });
    });
  })(req, res);
};

const getCurrentUser = (req, res) => {
  const user = User.findOne({ _id: req.user });
  if (user) {
    const { password, ...userWithoutPassword } = req.user.toObject();
    res.json({ user: userWithoutPassword });
  } else {
    res.status(404).json({ error: "error de passport" });
  }
};

module.exports = {
  loginUser,
  getForgotSent,
  getCurrentUser,
  postForgotPassword,
  generateJWT,
  getForgotPassword,
  getResetPassword,
  postResetPassword,
  perfil,
  getLogin,
  getRegister,
  logoutConSession,
  home,
  middlewareAuth,
};
