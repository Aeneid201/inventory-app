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
    const {rows} = await pool.query("SELECT * FROM products WHERE category_id = (SELECT id FROM categories WHERE name LIKE '"+ cat + "')")
    return rows;
}

async function getCategory(cat) {
    const {rows} = await pool.query("SELECT * FROM categories WHERE name LIKE '"+ cat + "' LIMIT 1")
    return rows[0]
}

async function getProduct(slug) {
    const {rows} = await pool.query("SELECT * FROM products WHERE slug LIKE '"+ slug + "'")
    return rows;
}


async function createProduct(name, description, price, categoryId, image) {
    await pool.query("INSERT INTO products (name, category_id, image, description, slug, price) VALUES ($1, $2, $3, $4, $5, $6)", [name, categoryId, image, description, name.toLowerCase().split(" ").join("-"), price])
}

async function updateProduct(name, description, price, categoryId, image) {
    await pool.query("UPDATE products SET name = $1, description = $2, image = $3, category_id = $4, price = $5, slug = $6", [name, categoryId, image, description, name.toLowerCase().split(" ").join("-"), price])
}

async function deleteProduct(id) {
    await pool.query("DELETE FROM products WHERE id = $1", [id])
}

async function getAllCategories() {
    const {rows} = await pool.query("SELECT * FROM categories")
    return rows
}

async function createCategory(catName, catDesc, catImage) {
    await pool.query("INSERT INTO categories (name, description, image) VALUES ($1, $2, $3)", [catName, catDesc, catImage])
}

async function updateCategory(catName, catDesc, catImage) {
    await pool.query("UPDATE categories SET name = $1, description = $2, image = $3", [catName, catDesc, catImage])
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