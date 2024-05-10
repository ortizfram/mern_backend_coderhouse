const User = require("../../models/user.model");

const home = (req, res) => {
  let user= req.session.user 
  res.render("home", {user:user});
};


;


// limitar el acceso a determinadas rutas
const middlewareAuth = (req,res, next)=>{
  if(req.session?.user){
    return next()
  }
  return res.status(401).send("error de autentificacion")
}

const logoutConSession = (req, res) => {
  res.clearCookie('user', { signed: true }); // Clear the signed cookie named 'user'
  req.session.destroy(err => {
    if (err) {
      return res.json({ status: 'Logout ERROR', body: err });
    }
    res.redirect('/api/sessions/login'); // Redirect to login page after logout
  });
};


const getRegister = (req,res)=> {
  res.render("registro", {})
}
const postRegister = (req,res)=> {
  const { first_name,last_name,email,password,age } = req.body;
  try {
    const role = email === "adminCoder@coder.com" ? "admin" : "user";

  // console.log("Cookie creada:", { user });
  const newUser = new User({first_name,last_name,email,password,age,role})
  // save in db
  newUser.save()

  res.sendStatus(200);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error creating user");
  }
}
const login = (req,res)=> {
  res.render("login", {})
}
const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Assuming you have a User model
    let user = await User.findOne({email });

    if (!user || user.password !== password) {
      return res.status(401).send('Unauthorized');
    }

    

    // If user is found, set session or cookie
    res.cookie("user", user, { signed: true });
    req.session.user = user
    res.sendStatus(200);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error logging in");
  }
};
const perfil = (req,res)=> {
  const user = req.session.user
  res.render("perfil", {user:user})
}


module.exports = {
  perfil,
  postLogin,
  getRegister,
  postRegister,
  login,
  middlewareAuth,
  logoutConSession,
  home,
};
