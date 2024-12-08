const express = require('express');
const router = express.Router();
const { validateData } = require('../middleware/validation')
const upload = require("../middleware/multer");
const mainController = require('../controllers/home')
const {categorySchema, productSchema, productEditSchema} = require('../schema')

router.get('/', mainController.getIndex)
router.post('/checkPassword', mainController.checkPassword)

// products
router.get('/products', mainController.getProducts)
router.get('/products/:slug', mainController.getProduct)
router.get('/product/create', mainController.createProduct)
router.get('/product/update/:product', mainController.editProductPage)
router.post('/addProduct', upload.single('image'), validateData(productSchema), mainController.storeProduct)
router.put('/updateProduct', upload.single('image'),validateData(productEditSchema), mainController.updateProduct)
router.delete('/deleteProduct', mainController.deleteProduct)

// categories
router.get('/categories', mainController.getCategories)
router.get('/categories/:category', mainController.getCategory)
router.get('/category/create', mainController.createCategory)
router.get('/category/update/:category', mainController.editCategoryPage)
router.post('/addCategory', upload.single('image'), validateData(categorySchema) , mainController.storeCategory)
router.put('/updateCategory', upload.single('image'),validateData(categorySchema), mainController.updateCategory)
router.delete('/deleteCategory', mainController.deleteCategory)


module.exports = router;
