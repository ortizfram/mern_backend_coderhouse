const passport = require("passport");
const User = require("../../models/user.model");
const { createHash, isValidPassword } = require("../../utils/utils");
const jwt = require("jsonwebtoken");

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
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send("error de autentificacion");
};

const logoutConSession = (req, res) => {
  res.clearCookie("jwt"); // Clear the JWT cookie
  res.redirect("/api/sessions/login"); // Redirect to login page after logout
};

const getRegister = (req, res) => {
  res.render("registro", {});
};

const getLogin = (req, res) => {
  res.render("login", {});
};

const perfil = (req, res) => {
  const user = req.user;
  res.render("perfil", { user: user });
};

const getResetPassword = (req, res) => {
  res.render("resetPassword", {});
};

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

const loginUser = (req, res) => {
  passport.authenticate('login', (err, user, info) => {
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
      res.cookie("jwt", token, { httpOnly: true });
      return res.json({ message: "Logged in successfully" });
    });
  })(req, res);
};

const getCurrentUser = (req, res) => {
  res.json({ user: req.user });
};

module.exports = {
  loginUser,
  getCurrentUser,
  generateJWT,
  getResetPassword,
  postResetPassword,
  perfil,
  getLogin,
  getRegister,
  logoutConSession,
  home,
  middlewareAuth,
};
