const express = require("express");
const passport = require("passport");
const {
  home,
  middlewareAuth,
  getLogin,
  getRegister,
  perfil,
  logoutConSession,
  getResetPassword,
  postResetPassword,
} = require("../../controllers/auth/auth.controller.js");

const router = express.Router();

router.get("/", home);
router.get("/perfil", middlewareAuth, perfil);
router.get("/logout", logoutConSession);

/**LOGIN*/
router.get("/login", getLogin);
router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/api/products", // Redirect to products on successful login
    failureRedirect: "/api/sessions/login", // Redirect back to login on failure
    failureFlash: true,
  })
);

/**REGISTER*/
router.get("/register", getRegister);
router.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/api/sessions/login", // Redirect to login on successful registration
    failureRedirect: "/api/sessions/register", // Redirect back to register on failure
    failureFlash: true,
  })
);

/**GITHUB AUTH*/
router.get("/github", passport.authenticate("github"));
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/api/sessions/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/api/products");
  }
);

/**RESET PASSW*/
router.get("/reset_password", getResetPassword);
router.post("/reset_password", postResetPassword);

router.get("/privado", middlewareAuth, (req, res) => {
  res.send("si ves esto ya te logueaste");
});

module.exports = router;
