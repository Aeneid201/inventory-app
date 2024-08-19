const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home')

router.get('/', homeController.getIndex)
router.get('/category/:category', homeController.getCategory)
router.get('/product/:slug', homeController.getProduct)

module.exports = router;
