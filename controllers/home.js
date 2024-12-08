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
        res.render('category/show', {products: products, category: category})
    },

    getProduct: async (req, res) => {
        const slug = req.params.slug
        const product = await db.getProduct(slug)        
        res.render('product/show', {product: product})
    },

    getProducts: async (req, res) => {
        const products = await db.getAllProducts()
        res.render('product/index', {products: products})
    },

    getCategories: async (req, res) => {
        const categories = await db.getAllCategories()
        res.render('category/index', {categories: categories})
    },

    // pages

    createCategory: async(req, res) => {
        res.render('category/create')
    },

    editCategoryPage: async(req, res) => {
        const cat = req.params.category
        const category = await db.getCategory(cat)
        res.render('category/update', {category: category})
    },

    createProduct: async(req, res) => {
        const allCategories = await db.getAllCategories()
        res.render('product/create', {categories: allCategories})
    },

    editProductPage: async(req, res) => {
        const allCategories = await db.getAllCategories()
        const productParam = req.params.product
        const product = await db.getProduct(productParam)
        res.render('product/update', {product: product, categories: allCategories})
    },

    // END pages
    
    storeCategory: async(req, res) => {
        try{

            const cat = await db.getCategory(req.body.name)
            if(cat) {
                console.log('this category already exists')
                return res.json({status: 'duplication', message: 'Category already exists.'})
            }

            if(req?.file?.path) {
                const result = await cloudinary.uploader.upload(req.file.path)
                await db.createCategory(req.body.name, req.body.description, result.secure_url, result.public_id)
            }else {
                await db.createCategory(req.body.name, req.body.description, process.env.PLACEHOLDER_URL, process.env.PLACEHOLDER_ID)
            }
            
            res.json({status: 'success'})
        }catch(err) {
            console.error(err)
        }
    },

    updateCategory: async (req, res) => {
        try{
            const cat = req.body.category
            const category = await db.getCategory(cat)

            if(!category) return 'Invalid category.';
            if(cat === 'uncategorized') {
                console.log('You can\'t update this category')
                return 'You can\'t update this category';
            }

            if(req?.file?.path) {
                if(category.cloudinary_id !== process.env.PLACEHOLDER_ID) {
                    cloudinary.uploader.destroy(category.cloudinary_id, function(result) { console.log(result) });
                }
                const result = await cloudinary.uploader.upload(req.file.path)

                await db.updateCategory(category.id, req.body.name, req.body.description, result.secure_url, result.public_id)
            }else {
                await db.updateCategory(category.id, req.body.name, req.body.description, category.image, category.cloudinary_id)
            }

            console.log('Category updated successfully.');
            
            res.redirect(`/category/update/${req.body.name}`)

        }catch(err) {
            console.error(err)
        }
    },

    deleteCategory: async (req, res) => {
        try{

            const cat = req.body.category
            const category = await db.getCategory(cat)

            if(!category) return 'Invalid category!';
            if(cat === 'uncategorized') {
                console.log('You can\'t delete this category')
                return 'You can\'t delete this category';
            }

            if(category.cloudinary_id !== process.env.PLACEHOLDER_ID) {
                cloudinary.uploader.destroy(category.cloudinary_id, function(result) { console.log(result) });
            }

            await db.deleteCategory(category.id)
            console.log('Category deleted')
            
        }catch(err) {
            console.error(err)
        }
    },

    storeProduct: async(req, res) => {
        try{

            const product = await db.getProductByName(req.body.name)

            if(product) {
                console.log('This product already exists')
                return res.json({status: 'duplication', message: 'Product already exists.'})
            }

            if(req?.file?.path) {
                const result = await cloudinary.uploader.upload(req.file.path)
                await db.createProduct(req.body.name, req.body.description, req.body.price, req.body.category, result.secure_url, result.public_id)

            }else {
                await db.createProduct(req.body.name, req.body.description, req.body.price, req.body.category, process.env.PLACEHOLDER_URL, process.env.PLACEHOLDER_ID)
            }
            
            res.status(201).json({status: "success", message: 'Product created successfully'});

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
                if(product.cloudinary_id !== process.env.PLACEHOLDER_ID) {
                    cloudinary.uploader.destroy(product.cloudinary_id, function(result) { console.log(result) });
                }
                
                const result = await cloudinary.uploader.upload(req.file.path)

                await db.updateProduct(product.id, req.body.name, req.body.description, req.body.price, req.body.slug, req.body.category, result.secure_url, result.public_id)

            }else{
                
                const slug = req.body.slug ? req.body.slug : (req.body.name).toLowerCase().split(" ").join("-")
                res.redirect(`/product/update/${slug}`)
                await db.updateProduct(product.id, req.body.name, req.body.description, req.body.price, slug, req.body.category, product.image, product.cloudinary_id)

            }

            //res.status(201).json({status: "success", message: 'Product updated successfully'});
            

        }catch(err) {
            console.error(err)
        }
    },

    deleteProduct: async (req, res) => {
        try{
            const productParam = req.body.product
            const product = await db.getProduct(productParam)

            if(!product) return 'Invalid product!'
            if(product.cloudinary_id !== process.env.PLACEHOLDER_ID) {
                cloudinary.uploader.destroy(product.cloudinary_id, function(result) { console.log(result) });
            }

            await db.deleteProduct(product.id)

            return res.json({status: "success"})
            
        }catch(err) {
            console.error(err)
        }
    },

    checkPassword: async (req, res) => {
        try {
            if(req.body.password === process.env.ADMIN_DELETE_ACCESS_CODE) return res.json({status: 'success'})
            else return res.json({status: 'error'})

        }catch(err){
            console.error(err)
        }
    }
}