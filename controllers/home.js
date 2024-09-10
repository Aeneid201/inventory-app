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
    }
}