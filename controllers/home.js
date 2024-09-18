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
        res.render('product', {product: product})
    },

    getProducts: async (req, res) => {
        const products = await db.getAllProducts()
        res.render('products', {products: products})
    },

    getCategories: async (req, res) => {
        const categories = await db.getAllCategories()
        res.render('categories', {categories: categories})
    },

    // pages

    createCategoryPage: async(req, res) => {
        res.render('createCategory')
    },

    editCategoryPage: async(req, res) => {
        const cat = req.params.category
        const category = await db.getCategory(cat)
        res.render('editCategory', {category: category})
    },

    createProductPage: async(req, res) => {
        const allCategories = await db.getAllCategories()
        res.render('createProduct', {categories: allCategories})
    },

    editProductPage: async(req, res) => {
        const allCategories = await db.getAllCategories()
        const productParam = req.params.product
        const product = await db.getProduct(productParam)
        res.render('editProduct', {product: product, categories: allCategories})
    },

    // END pages
    
    addCategory: async(req, res) => {
        try{

            //TODO: check if category already exists

            if(req?.file?.path) {
                const result = await cloudinary.uploader.upload(req.file.path)
                await db.createCategory(req.body.name, req.body.description, result.secure_url, result.public_id)
            }else {
                await db.createCategory(req.body.name, req.body.description, 'https://res.cloudinary.com/dstdwoljc/image/upload/v1726535753/placeholder_hz8mbp.png', 'placeholder_hz8mbp')
            }
            
            res.redirect('/categories')
        }catch(err) {
            console.error(err)
        }
    },

    updateCategory: async (req, res) => {
        try{
            const cat = req.body.category
            const category = await db.getCategory(cat)

            if(!category) return 'Invalid category.'

            if(req?.file?.path) {
                cloudinary.uploader.destroy(category.cloudinary_id, function(result) { console.log(result) });
                const result = await cloudinary.uploader.upload(req.file.path)

                await db.updateCategory(category.id, req.body.name, req.body.description, result.secure_url, result.public_id)
            }else {
                await db.updateCategory(category.id, req.body.name, req.body.description, category.image, category.cloudinary_id)
            }

            console.log('Category updated successfully.');
            
            res.redirect(`/editCategory/${req.body.name}`)

        }catch(err) {
            console.error(err)
        }
    },

    deleteCategory: async (req, res) => {
        try{

            const cat = req.body.category
            const category = await db.getCategory(cat)

            if(!category) return 'Invalid category!'
            cloudinary.uploader.destroy(category.cloudinary_id, function(result) { console.log(result) });
            await db.deleteCategory(category.id)
            console.log('Category deleted')

            res.redirect('/categories')
            
        }catch(err) {
            console.error(err)
        }
    },

    addProduct: async(req, res) => {
        try{

            //TODO: check if product already exists

            if(req?.file?.path) {
                const result = await cloudinary.uploader.upload(req.file.path)
                await db.createProduct(req.body.name, req.body.description, req.body.price, req.body.category, result.secure_url, result.public_id)

            }else {
                await db.createProduct(req.body.name, req.body.description, req.body.price, req.body.category, 'https://res.cloudinary.com/dstdwoljc/image/upload/v1726535753/placeholder_hz8mbp.png', 'placeholder_hz8mbp')
            }
            
            console.log('Product added successfully!');
            res.redirect('back')

        }catch(err) {
            console.error(err)
        }
    },

    updateProduct: async (req, res) => {
        try{

            const productParam = req.body.product
            const product = await db.getProduct(productParam)

            if(!product) return 'Invalid product'
            if(req?.file?.path) {
                cloudinary.uploader.destroy(product.cloudinary_id, function(result) { console.log(result) });
                const result = await cloudinary.uploader.upload(req.file.path)

                await db.updateProduct(product.id, req.body.name, req.body.description, req.body.price, req.body.slug, req.body.category, result.secure_url, result.public_id)

            }else{
                await db.updateProduct(product.id, req.body.name, req.body.description, req.body.price, req.body.slug, req.body.category, product.image, product.cloudinary_id)

            }

            console.log('Product updated successfully!');
            res.redirect(`/editProduct/${req.body.slug}`)

        }catch(err) {
            console.error(err)
        }
    },

    deleteProduct: async (req, res) => {
        try{
            const productParam = req.body.product
            const product = await db.getProduct(productParam)

            if(!product) return 'Invalid product!'
            cloudinary.uploader.destroy(product.cloudinary_id, function(result) { console.log(result) });
            await db.deleteProduct(product.id)

            console.log('Product deleted successfully!');
            res.redirect('/products')
            
        }catch(err) {
            console.error(err)
        }
    },
}