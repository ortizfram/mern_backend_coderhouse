const User = require('../../dao/models/user.model'); // make sure you have the correct path to your User model

const getChangeRolesView = async (req, res) => {
  try {
    const userList = await User.find(); // Await the result of the query
    res.render("changeRoles", { userList });
  } catch (error) {
    console.error("Failed to fetch user list", error);
    res.status(500).send("Internal Server Error");
  }
};

const toPremium = async (req, res) => {
  const { uid } = req.params;
  try {
    await User.findByIdAndUpdate(uid, { role: 'premium' });
    res.redirect('/');
  } catch (error) {
    console.error("Failed to update user role", error);
    res.status(500).send("Internal Server Error");
  }
};

const toAdmin = async (req, res) => {
  const { uid } = req.params;
  try {
    await User.findByIdAndUpdate(uid, { role: 'admin' });
    res.redirect('/');
  } catch (error) {
    console.error("Failed to update user role", error);
    res.status(500).send("Internal Server Error");
  }
};

const toUser = async (req, res) => {
  const { uid } = req.params;
  try {
    await User.findByIdAndUpdate(uid, { role: 'user' });
    res.redirect('/');
  } catch (error) {
    console.error("Failed to update user role", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getChangeRolesView,
  toPremium,
  toAdmin,
  toUser
};
