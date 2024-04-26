import Router from "express"

const router = Router();

let users = [];

router.get("/users", (req, res) => {
  return res.json({ users });
});
router.post("/user", (req, res) => {
    const { name, surname } = req.body;
    const newUser = { name, surname };
    users.push(newUser);
    console.log(newUser)
    res.status(201).json(newUser);
});

export default router
