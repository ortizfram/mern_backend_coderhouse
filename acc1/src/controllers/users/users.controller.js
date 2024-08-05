const { mongoose } = require("mongoose");
const User = require("../../dao/models/user.model");

const getChangeRolesView = async (req, res) => {
  try {
    const userList = await User.find(); 
    res.render("changeRoles", { userList });
  } catch (error) {
    console.error("Failed to fetch user list", error);
    res.status(500).send("Internal Server Error");
  }
};

const getRoleChanged = async (req,res)=>{
  res.render("roleChanged",{})
}

const toPremiumAndViceversa = async (req, res) => {
  const { uid } = req.params;
  const { role } = req.body;

  if (!["user", "premium", "admin"].includes(role)) {
    return res.status(400).send("Invalid role");
  }

  const user = User.findOne(new mongoose.Types.ObjectId(uid));
  if (user.role === role) {
    return res.status(400).send("Can't change for same role");
  }

  try {
    await User.findByIdAndUpdate(new mongoose.Types.ObjectId(uid), { role });
    res.redirect("/api/users/role_changed");
  } catch (error) {
    console.error("Failed to update user role", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getChangeRolesView,
  toPremiumAndViceversa,
  getRoleChanged
};
