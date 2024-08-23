const express = require("express");
const router = express.Router();
const {
  getChangeRolesView,
  toPremium,
  toAdmin,
  toUser,
  toPremiumAndViceversa,
  getRoleChanged,
  uploadDocUser,
  getUploadDocUser,
  getDocsPrev,
  delInnactiveUsers,
  getInactiveUsers,
} = require("../../controllers/users/users.controller");
const upload = require("../../config/multerStorage");
const checkRequiredDocuments = require("../../controllers/users/requiredDocs");

router.get("/", getChangeRolesView);
router.get("/innactive", getInactiveUsers);
router.delete("/", delInnactiveUsers);
router.get("/role_changed", getRoleChanged);
router.post("/premium/:uid", checkRequiredDocuments, toPremiumAndViceversa);
router.get("/:uid/documents", getUploadDocUser);
router.get("/:uid/documents/prev", getDocsPrev);
router.post("/:uid/documents", upload.any(), uploadDocUser);
module.exports = router;
