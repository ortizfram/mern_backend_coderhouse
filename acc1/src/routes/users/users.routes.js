const express = require('express');
const router = express.Router();
const { getChangeRolesView, toPremium, toAdmin, toUser } = require('../../controllers/users/users.controller')

router.get("/", getChangeRolesView);

router.post("/:uid", (req, res) => {
  const { uid } = req.params;
  const { role } = req.body;
  switch (role) {
    case 'admin':
      toAdmin(req, res);
      break;
    case 'premium':
      toPremium(req, res);
      break;
    case 'user':
      toUser(req, res);
      break;
    default:
      res.status(400).send("Invalid role");
  }
});

module.exports = router;
