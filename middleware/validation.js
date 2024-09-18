module.exports = {
    validateData: function (schema) {
        return async (req, res, next) => {
            try{
                if(!schema) return res.json({status: 'error', message: 'Invalid Schema'})
                await schema.parse(req.body)
                res.json({status: 'success'})
                return next()
    
            }catch(err) {
            //console.error(err)
            return res.json({status: 'error', errors: err.errors})
            }
        }
    }
}