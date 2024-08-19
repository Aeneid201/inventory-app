const db = require("../db/queries")

module.exports = {
    getIndex: async (req, res) => {
        const products = await db.getAllProducts()
        const categories = await db.getAllCategories()
        res.render('index', {products : products, categories: categories})
    },

    getCategory: async (req, res) => {
        const cat = req.params.category
        const products = await db.getCategory(cat)
        res.render('category', {products: products, title : cat})
    },

    getProduct: async (req, res) => {
        const slug = req.params.slug
        const product = await db.getProduct(slug)        
        res.render('product', {product: product[0]})
    },

    getProducts: async (req, res) => {
        const products = await db.getAllProducts()
        res.render('products', products)
    },
}