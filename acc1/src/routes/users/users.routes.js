const express = require('express');
const router = express.Router();
const { getChangeRolesView, toPremium, toAdmin, toUser, toPremiumAndViceversa, getRoleChanged } = require('../../controllers/users/users.controller');

router.get("/", getChangeRolesView);
router.get("/role_changed", getRoleChanged)
router.post("/premium/:uid",toPremiumAndViceversa);

module.exports = router;
