const { default: mongoose } = require("mongoose");
const User = require("../../dao/models/user.model");

const requiredDocuments = ["Identificacion", "Comprobante de domicilio", "Comprobante de estado de cuenta"];

const checkRequiredDocuments = async (req, res, next) => {
  const { uid } = req.params;
  const { role } = req.body;

  if (role !== "premium") {
    return next(); // Skip the check if the role is not "premium"
  }

  try {
    const user = await User.findById(new mongoose.Types.ObjectId(uid));
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Extract the base name of each uploaded document without the file extension
    const uploadedDocuments = user.documents.map(doc => {
      return doc.name.split('.').slice(0, -1).join('.');
    });

    console.log(uploadedDocuments);

    // Check if all required documents are present
    const hasAllDocuments = requiredDocuments.every(doc => uploadedDocuments.includes(doc));

    if (!hasAllDocuments) {
      return res.status(400).send("User must upload Identification, Proof of Address, and Proof of Account Status to become Premium");
    }

    next(); // Proceed to the role update if the check passes
  } catch (error) {
    console.error("Error checking user documents", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = checkRequiredDocuments;
