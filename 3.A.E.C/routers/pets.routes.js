const { Router } = require("express");

const router = Router();

let pets = [];

router.get("/pets", (req, res) => {
  return res.json({ pets });
});
router.post("/pet", (req, res) => {
  const { name } = req.body;
    const newPet = { name };
    pets.push(newPet);
    console.log(newPet)
    res.status(201).json(newPet);
});

module.exports = router;
