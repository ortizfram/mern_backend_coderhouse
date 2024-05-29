const passport = require("passport");

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

module.exports = middlewareAuth;
