const home = (req, res) => {
  res.render("registro", {});
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
  const { user } = req.body;
  res.cookie("user", user, { maxAge: 10000, signed: true }); // Cookie válida por 10 segundos
  console.log("Cookie creada:", { user });
  res.sendStatus(200);
}
const perfil = (req,res)=> {
  res.render("perfil", {})
}


module.exports = {
  getRegister,
  postRegister,
  login,
  loginConSessionCounter,
  logoutConSession,
  middlewareAuth,
  loginConSession,
  sessionCounter,
  inyectarGetCookie,
  inyectarSetCookie,
  setCoookie,
  getCoookie,
  deleteCoookie,
  setSignedCoookie,
  getSignedCoookie,
  deleteSignedCoookie,
  home,
};
