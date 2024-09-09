const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category')

router.get('/:category', categoryController.getCategory)
router.get('/create', categoryController.createCategoryPage)

module.exports = router;