import {Router} from"express";

const router = Router();

router.get("/pets", (req, res) => {
  let pets = [];
  return res.json({ pets });
});
router.post("/pet", (req, res) => {
  const newPet = req.body;
  pets.push(newPet);
  res.status(201).json(newPet);
});

export default router
