const express = require('express');
const router = express.Router();
const { validateData } = require('../middleware/validation')
const upload = require("../middleware/multer");
const mainController = require('../controllers/home')
const {categorySchema, productSchema, productEditSchema} = require('../schema')

router.get('/', mainController.getIndex)
router.get('/product/:slug', mainController.getProduct)

router.get('/products', mainController.getProducts)
router.get('/categories', mainController.getCategories)
router.get('/category/:category', mainController.getCategory)

router.get('/createCategory', mainController.createCategoryPage)
router.get('/createProduct', mainController.createProductPage)
router.get('/editCategory/:category', mainController.editCategoryPage)
router.get('/editProduct/:product', mainController.editProductPage)


router.post('/addCategory', upload.single('image'), validateData(categorySchema) , mainController.addCategory)
router.post('/addProduct', upload.single('image'), validateData(productSchema), mainController.addProduct)

router.put('/updateCategory', upload.single('image'),validateData(categorySchema), mainController.updateCategory)
router.put('/updateProduct', upload.single('image'),validateData(productEditSchema), mainController.updateProduct)

router.delete('/deleteCategory', mainController.deleteCategory)
router.delete('/deleteProduct', mainController.deleteProduct)

module.exports = router;
