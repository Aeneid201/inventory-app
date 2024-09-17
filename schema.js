const {z} = require('zod')

export const productSchema = z.object(
    {
        name: z.string().min(1, {message: "Name of the product is required"})
    }
)


export const categorySchema = z.object(
    {
        name: z.string().min(1, {message: "Name of the category is required"})
    }
)
