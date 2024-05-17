const bcrypt = require("bcrypt");

const createHash = (password) => {
  /** hashea el password */
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
const isValidPassword = ({ userPassword, password }) => {
 console.log("isValidPassword called")
  /** compara el password con el de la base */
  console.log(userPassword)
  console.log(typeof(userPassword))
  return bcrypt.compareSync(password,userPassword)
};

module.exports = {
  isValidPassword,
  createHash,
};
