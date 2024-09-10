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


async function getAllCategories() {
    const {rows} = await pool.query("SELECT * FROM categories")
    return rows
}

async function createCategory(catName, catDesc, catImage) {
    await pool.query("INSERT INTO categories (name, description, image) VALUES ($1, $2, $3)", [catName, catDesc, catImage])
}

module.exports = {
    getFeaturedProducts,
    getAllProducts,
    getAllCategories,
    getProductsByCategory,
    getProduct,
    getCategory,
    createCategory,
}