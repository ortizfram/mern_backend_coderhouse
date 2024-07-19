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
  loginUser,
  getCurrentUser,
} = require("../../controllers/auth/auth.controller.js");

const router = express.Router();

router.get("/", home);
router.get("/perfil", middlewareAuth, perfil);

/**LOGOUT*/
router.get("/logout", logoutConSession);

/**LOGIN*/
router.get("/login", getLogin);
router.post("/login", loginUser);

/**REGISTER*/
router.get("/register", getRegister);
router.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/api/sessions/login",
    failureRedirect: "/api/sessions/register",
    failureFlash: true,
  })
);

/**GITHUB AUTH*/
router.get("/github", passport.authenticate("github"));
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/api/sessions/login" }),
  function (req, res) {
    res.redirect("/api/products");
  }
);

/**RESET PASSWORD*/
router.get("/reset_password", getResetPassword);
router.post("/reset_password", postResetPassword);

/**PRIVATE*/
router.get("/privado", middlewareAuth, (req, res) => {
  res.send("si ves esto ya te logueaste");
});

/**GET CURRENT USER FROM JWT*/
router.get("/current", middlewareAuth, getCurrentUser);

module.exports = router;
