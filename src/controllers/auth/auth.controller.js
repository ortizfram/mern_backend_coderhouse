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

module.exports = {
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
