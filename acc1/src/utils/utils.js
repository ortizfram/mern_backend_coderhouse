const bcrypt = require("bcrypt");

const createHash = (password) => {
  /** hashea el password */
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
const isValidPassword = ({ userPassword, password }) => {
  console.log("isValidPassword called")
  const isMatch = bcrypt.compareSync(password, userPassword);
  console.log(isMatch);
  console.log(typeof isMatch);
  return isMatch;
};

module.exports = {
  isValidPassword,
  createHash,
};
