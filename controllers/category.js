const db = require("../db/queries")

module.exports = {

    getCategory: async (req, res) => {
        const cat = req.params.category
        const products = await db.getProductsByCategory(cat)
        const category = await db.getCategory(cat)
        res.render('category', {products: products, category: category})
    },
}