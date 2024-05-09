const User = require("../../models/user.model");

const home = (req, res) => {
  res.render("home", {});
};

const login = (req,res)=> {
  res.render("login", {})
}

// limitar el acceso a determinadas rutas
const middlewareAuth = (req,res, next)=>{
  if(req.session?.user){
    return next()
  }
  return res.status(401).send("error de autentificacion")
}

const logoutConSession = (req,res)=>{
  
  req.session.destroy = (err =>{
    if(err){
      return res.json({status:'Logout ERROR',body:err})
    }
    res.render('login')
  })
}

const getRegister = (req,res)=> {
  res.render("registro", {})
}
const postRegister = (req,res)=> {
  const { first_name,last_name,email,password,age } = req.body;
  try {
    //esto va en login
  // res.cookie("user", user, { maxAge: 10000, signed: true });
  // console.log("Cookie creada:", { user });
  const newUser = new User({first_name,last_name,email,password,age})
  // save in db
  newUser.save()

  res.sendStatus(200);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error creating user");
  }
}
const perfil = (req,res)=> {
  res.render("perfil", {})
}


module.exports = {
  getRegister,
  postRegister,
  login,
  middlewareAuth,
  home,
};
