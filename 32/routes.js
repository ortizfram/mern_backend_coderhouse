// userRouter.js
const express = require('express');
const { errorMiddleware, validateUid } = require('./middlewares/customError');

const router = express.Router();

router.get('/:uid', validateUid, (req, res) => {
  // lógica para devolver al usuario...
  res.send(`User with ID: ${req.params.uid}`);
});

// Uso del middleware de errores
router.use(errorMiddleware);

module.exports = router;
