const home = (req, res) => {
  res.render("index", {});
};

// normal cookies
const setCoookie = (req, res) => {
  res
    .cookie("CoderCookie", "esta es una cookie muy poderosa", { maxAge: 10000 })
    .send("Cookie");
  res.render("index", {});
};
const getCoookie = (req, res) => {
  res.send(req.cookies);
};
const deleteCoookie = (req, res) => {
  res.clearCookie("CoderCookie").send("Cookie Removed");
};

// signed cookies
const setSignedCoookie = (req, res) => {
  res
    .cookie("CoderCookie", "esta es una cookie muy poderosa", {
      maxAge: 10000,
      signed: true,
    })
    .send("Cookie");
};
const getSignedCoookie = (req, res) => {
  res.send(req.signedCookies);
};
const deleteSignedCoookie = (req, res) => {
  res.clearCookie("CoderCookie").send("Cookie Removed");
};

// inyectar cookies
const inyectarGetCookie = (req, res) => {
  console.log("Cookie recibida:", req.signedCookies);
  res.send(req.signedCookies);
};
const inyectarSetCookie = (req, res) => {
  const { user } = req.body;
  res.cookie("user", user, { maxAge: 10000, signed: true }); // Cookie válida por 10 segundos
  console.log("Cookie creada:", { user });
  res.sendStatus(200);
};

// express-session
const sessionCounter = (req,res)=>{
  if(req.session.counter){
    req.session.counter++
    res.send(`has visitado el sitio ${req.session.counter} veces`)
  }else {
    req.session.counter = 1
    res.send('')
  }
}

const loginConSession = (req,res)=>{
  const {username,password} = req.query
  if(username !== 'pepe' || password !== 'pepepass'){
    return res.send('login failed')
  }
  req.session.user = username
  req.session.admin=true
  res.send(`te damos la bienvenida ${req.session.user}`)
}
const loginConSessionCounter = (req,res)=>{
  const {username,password} = req.query
  if(username !== 'pepe' || password !== 'pepepass'){
    return res.send('login failed')
  }
  if(req.session.counter){
    req.session.counter++
  }else {
    req.session.counter = 1
  }
  req.session.user = username
  req.session.admin=true
  res.send(`te damos la bienvenida ${req.session.user}, has visitado el sitio ${req.session.counter} veces`)
}
// limitar el acceso a determinadas rutas
const middlewareAuth = (req,res, next)=>{
  if(req.session?.user === 'pepe' && req.session?.admin){
    return next()
  }
  return res.status(401).send("error de autentificacion")
}

const logoutConSession = (req,res)=>{
  
  req.session.destroy = (err =>{
    if(err){
      return res.json({status:'Logout ERROR',body:err})
    }
    res.send('Logout ok!')
  })
}


module.exports = {
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
