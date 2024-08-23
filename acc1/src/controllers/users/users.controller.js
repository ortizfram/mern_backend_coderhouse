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

const getRoleChanged = async (req, res) => {
  res.render("roleChanged", {});
};

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

const getUploadDocUser = async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(404).json({ message: "User not found" });
    }

    res.render("documents", { uid });
  } catch (error) {
    res.status(500).json({ message: "Error uploading documents", error });
  }
};

const uploadDocUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(new mongoose.Types.ObjectId(uid));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Procesar los archivos subidos
    req.files.forEach((file) => {
      user.documents.push({ name: file.originalname, reference: file.path });
    });

    await user.save();

    res.redirect(`/api/users/${uid}/documents/prev`);
  } catch (error) {
    res.status(500).json({ message: "Error uploading documents", error });
  }
};
const getDocsPrev = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(new mongoose.Types.ObjectId(uid));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Pass the user's documents to the template
    res.render("docsprev", { uid: user._id, documents: user.documents });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving documents", error });
  }
};

module.exports = {
  getChangeRolesView,
  toPremiumAndViceversa,
  getRoleChanged,
  uploadDocUser,
  getUploadDocUser,
  getDocsPrev,
};
