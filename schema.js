const {z} = require('zod')

 const productSchema = z.object(
    {
        name: z.string().min(1, {message: "The name field is required"}),
        category: z.string().min(1, {message: "The category is required"}),
        price: z.coerce.number().min(2, {message: "The price is required"}),
        description: z.string().optional(),
    }
)

const productEditSchema = z.object(
    {
        name: z.string().min(1, {message: "The name field is required"}),
        category: z.string().min(1, {message: "The category is required"}),
        price: z.coerce.number().min(2, {message: "The price is required"}),
        description: z.string().optional(),
        slug: z.string().min(3, {message: "The slug is required"})
    }
)


 const categorySchema = z.object(
    {
        name: z.string().min(1, {message: "Category name is required"}),
        description: z.string().optional(),
    }
)


module.exports = {productSchema, categorySchema, productEditSchema}
