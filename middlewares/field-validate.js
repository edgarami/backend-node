//custon Middlewares
const {response } = require('express')
const { validationResult } = require('express-validator')

const validateFields = ( req, res = response, next ) =>{
   
    const myErrors = validationResult( req );

    if (!myErrors.isEmpty() ){
        return res.status(400).json({
            errors: myErrors.mapped()
        })
    }

    next()

}

module.exports = {
    validateFields
}