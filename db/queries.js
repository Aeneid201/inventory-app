const pool = require('./pool')

async function getAllProducts() {
    const {rows} = await pool.query("SELECT * FROM products LIMIT 6")
    return rows
}

async function getCategory(cat) {
    const {rows} = await pool.query("SELECT * FROM products WHERE category_id = (SELECT id FROM categories WHERE name LIKE '"+ cat + "')")
    return rows;
}

async function getProduct(slug) {
    const {rows} = await pool.query("SELECT * FROM products WHERE slug LIKE '"+ slug + "'")
    return rows;
}


async function getAllCategories() {
    const {rows} = await pool.query("SELECT * FROM categories")
    return rows
}

async function insertUsername(username) {
    await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username])
}


module.exports = {
    getAllProducts,
    getAllCategories,
    getCategory,
    getProduct
}