const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const mainController = require('../controllers/home')

router.get('/', mainController.getIndex)
router.get('/product/:slug', mainController.getProduct)
router.get('/createCategory', mainController.createCategoryPage)
router.get('/products', mainController.getProducts)
router.get('/category/:category', mainController.getCategory)
router.post('/addCategory', upload.single('image') , mainController.addCategory)
router.put('/updateCategory', mainController.updateCategory)
router.delete('/deleteCategory', mainController.deleteCategory)

module.exports = router;
