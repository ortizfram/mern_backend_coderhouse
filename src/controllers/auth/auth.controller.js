const setCoookie = (req, res) => {
  res
    .cookie("CoderCookie", "esta es una cookie muy poderosa", { maxAge: 10000 })
    .send("Cookie");
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

module.exports = {
  setCoookie,
  getCoookie,
  deleteCoookie,
  setSignedCoookie,
  getSignedCoookie,
  deleteSignedCoookie,
};
