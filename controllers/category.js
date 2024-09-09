const db = require("../db/queries")

module.exports = {

    getCategory: async (req, res) => {
        const cat = req.params.category
        const products = await db.getCategory(cat)
        res.render('category', {products: products, title : cat})
    },

    createCategory: async(req, res) => {
        try{
            const newCat = req.body.category || null;
            await db.createCategory(newCat)
            console.log(`New category added: ${newCat}`);
            res.redirect('back')
        }catch(err) {
            console.error(err)
        }
    },
    
    createCategoryPage: async (req, res) => {
        res.render('category/createCategory')
    }
}