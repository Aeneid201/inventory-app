module.exports = {
    validateData: function (schema) {
        return async (req, res, next) => {
            try{
                if(!schema) return res.json({status: 'error', message: 'Invalid Schema'})
                await schema.parse(req.body)
                return next()
    
            }catch(err) {
                return res.json({status: 'error', errors: err.errors})
            }
        }
    }
}