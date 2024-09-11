const db = require("../db/queries")
const cloudinary = require("../middleware/cloudinary");

module.exports = {
    getIndex: async (req, res) => {
        const products = await db.getFeaturedProducts()
        const categories = await db.getAllCategories()
        res.render('index', {products : products, categories: categories})
    },

    getCategory: async (req, res) => {
        const cat = req.params.category
        const products = await db.getProductsByCategory(cat)
        const category = await db.getCategory(cat)
        res.render('category', {products: products, category: category})
    },

    getProduct: async (req, res) => {
        const slug = req.params.slug
        const product = await db.getProduct(slug)        
        res.render('product', {product: product[0]})
    },

    getProducts: async (req, res) => {
        const products = await db.getAllProducts()
        res.render('products', {products: products})
    },

    getCategories: async (req, res) => {
        const categories = await db.getAllCategories()
        res.render('categories', {categories: categories})
    },

    createCategoryPage: async(req, res) => {
        res.render('createCategory')
    },

    addCategory: async(req, res) => {
        try{
            const result = await cloudinary.uploader.upload(req.file.path)
            await db.createCategory(req.body.name, req.body.description, result.secure_url)
            
            res.redirect('back')
        }catch(err) {
            console.error(err)
        }
    },

    updateCategory: async (req, res) => {
        try{
            const result = await cloudinary.uploader.upload(req.file.path)
            await db.updateCategory(req.body.name, req.body.description, result.secure_url)
            res.redirect('back')

        }catch(err) {
            console.error(err)
        }
    },

    deleteCategory: async (req, res) => {
        try{

            await db.deleteCategory(req.body.id)
            res.redirect('back')
            
        }catch(err) {
            console.error(err)
        }
    },

    createProductPage: async(req, res) => {
        const allCategories = await db.getAllCategories()
        res.render('createProduct', {categories: allCategories})
    },

    addProduct: async(req, res) => {
        try{
            const result = await cloudinary.uploader.upload(req.file.path)
            await db.createProduct(req.body.name, req.body.description, req.body.price, req.body.category, result.secure_url)
            
            console.log('Product added successfully!');
            
            res.redirect('back')
        }catch(err) {
            console.error(err)
        }
    },

    updateProduct: async (req, res) => {
        try{
            const result = await cloudinary.uploader.upload(req.file.path)
            await db.updateProduct(req.body.name, req.body.description, req.body.price, req.body.category, result.secure_url)

            console.log('Product updated successfully!');
            res.redirect('back')

        }catch(err) {
            console.error(err)
        }
    },

    deleteProduct: async (req, res) => {
        try{

            await db.deleteProduct(req.body.id)
            console.log('Product deleted successfully!');
            res.redirect('back')
            
        }catch(err) {
            console.error(err)
        }
    },
}