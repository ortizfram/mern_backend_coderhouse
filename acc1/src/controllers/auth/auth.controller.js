const User = require("../../models/user.model");
const { createHash, isValidPassword } = require("../../utils/utils");

const home = (req, res) => {
  let user = req.session.user;
  res.render("login", { user: user });
};

// limitar el acceso a determinadas rutas
const middlewareAuth = (req, res, next) => {
  if (req.session?.user) {
    return next();
  }
  return res.status(401).send("error de autentificacion");
};

const logoutConSession = (req, res) => {
  res.clearCookie("user", { signed: true }); // Clear the signed cookie named 'user'
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.redirect("/api/sessions/login"); // Redirect to login page after logout
  });
};

const getRegister = (req, res) => {
  res.render("registro", {});
};
const postRegister = (req, res) => {
  const { first_name, last_name, email, password, age } = req.body;
  try {
    const role = email === "adminCoder@coder.com" ? "admin" : "user";

    // console.log("Cookie creada:", { user });
    const hash = createHash(password);
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hash,
      age,
      role,
    });
    // save in db
    newUser.save();

    res.sendStatus(200);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error creating user");
  }
};
const login = (req, res) => {
  res.render("login", {});
};
const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = isValidPassword({ userPassword: user.password, password });

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Successful login logic here (e.g., creating a session or JWT)
    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const perfil = (req, res) => {
  const user = req.session.user;
  res.render("perfil", { user: user });
};
const getResetPassword = (req,res)=>{
  res.render("resetPassword", {})
}
const postResetPassword = async(req,res)=>{
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // Hash the new password
    const hashedPassword = createHash(password);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getResetPassword,
  postResetPassword,
  perfil,
  postLogin,
  getRegister,
  postRegister,
  login,
  middlewareAuth,
  logoutConSession,
  home,
};
