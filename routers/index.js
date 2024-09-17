const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const mainController = require('../controllers/home')

router.get('/', mainController.getIndex)
router.get('/product/:slug', mainController.getProduct)

router.get('/products', mainController.getProducts)
router.get('/categories', mainController.getCategories)
router.get('/category/:category', mainController.getCategory)

router.get('/createCategory', mainController.createCategoryPage)
router.get('/createProduct', mainController.createProductPage)
router.get('/editCategory/:category', mainController.editCategoryPage)
router.get('/editProduct/:product', mainController.editProductPage)


router.post('/addCategory', upload.single('image') , mainController.addCategory)
router.post('/addProduct', upload.single('image'), mainController.addProduct)

router.put('/updateCategory', upload.single('image'), mainController.updateCategory)
router.put('/updateProduct', upload.single('image'), mainController.updateProduct)

router.delete('/deleteCategory', mainController.deleteCategory)
router.delete('/deleteProduct', mainController.deleteProduct)

module.exports = router;
