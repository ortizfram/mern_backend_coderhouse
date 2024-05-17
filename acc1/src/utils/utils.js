const bcrypt = require("bcrypt");

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const isValidPassword = ({ userPassword, password }) => {
  if (!userPassword || !password) {
    console.error("Invalid arguments: userPassword or password is missing");
    return false;
  }
  console.log("Comparing passwords:", password, userPassword);
  const isMatch = bcrypt.compareSync(password, userPassword);
  console.log("Password match result:", isMatch);
  return isMatch;
};

module.exports = {
  isValidPassword,
  createHash,
};
