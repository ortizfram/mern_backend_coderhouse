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

module.exports = { setCoookie, getCoookie, deleteCoookie };
