// routes/mockRouter.js
const express = require('express');
const mockProducts = require('./middlewares/mockingProds');


const router = express.Router();

router.get('/mockingproducts', mockProducts);

module.exports = router;
