const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const homeController = require('../controllers/home')

router.get('/', homeController.getIndex)
router.get('/product/:slug', homeController.getProduct)
router.get('/createCategory', homeController.createCategoryPage)
router.post('/addCategory', upload.single('image') , homeController.addCategory)

module.exports = router;
