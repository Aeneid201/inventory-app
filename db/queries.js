const pool = require('./pool')

async function getFeaturedProducts() {
    const {rows} = await pool.query("SELECT * FROM products LIMIT 6")
    return rows
}

async function getAllProducts() {
    const {rows} = await pool.query("SELECT * FROM products")
    return rows
}

async function getProductsByCategory(cat) {
    const {rows} = await pool.query("SELECT * FROM products WHERE category_id = (SELECT id FROM categories WHERE name LIKE $1)", [cat])
    return rows;
}

async function getCategory(cat) {
    const {rows} = await pool.query("SELECT * FROM categories WHERE name LIKE $1 LIMIT 1", [cat])
    return rows[0]
}

async function getProduct(slug) {
    const {rows} = await pool.query("SELECT * FROM products WHERE slug LIKE $1", [slug])
    return rows[0];
}


async function createProduct(name, description, price, categoryId, image, cloudinary_id) {
    await pool.query("INSERT INTO products (name, category_id, image, description, slug, price, cloudinary_id) VALUES ($1, $2, $3, $4, $5, $6, $7)", [name, categoryId, image, description, name.toLowerCase().split(" ").join("-"), price, cloudinary_id])
}

async function updateProduct(id, name, description, price, slug, categoryId, image, cloudinary_id) {
    await pool.query("UPDATE products SET name = $1, description = $2, image = $3, category_id = $4, price = $5, slug = $6, cloudinary_id = $7 WHERE id = $8", [name, description, image, categoryId, price, slug, cloudinary_id, id])
}

async function deleteProduct(id) {
    await pool.query("DELETE FROM products WHERE id = $1", [id])
}

async function getAllCategories() {
    const {rows} = await pool.query("SELECT * FROM categories")
    return rows
}

async function createCategory(catName, catDesc, catImage, cloudinary_id) {
    await pool.query("INSERT INTO categories (name, description, image, cloudinary_id) VALUES ($1, $2, $3, $4)", [catName, catDesc, catImage, cloudinary_id])
}

async function updateCategory(id, name, description, image, cloudinary_id) {
    await pool.query("UPDATE categories SET name = $1, description = $2, image = $3, cloudinary_id = $4 WHERE id = $5", [name, description, image, cloudinary_id, id])
}

async function deleteCategory(id) {
    await pool.query("DELETE FROM categories WHERE id = $1", [id])
}

module.exports = {
    getFeaturedProducts,
    getAllProducts,
    getAllCategories,
    getProductsByCategory,
    getProduct,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    createProduct,
    updateProduct,
    deleteProduct
}