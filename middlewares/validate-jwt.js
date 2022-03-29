const jwt = require('jsonwebtoken')

const validateJWT = (req, res, next ) => {
    // Leer token

    const token = req.header('x-token')

    console.log(token)
    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET);

        
        req.uid = uid;
        next()

    
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }

}

module.exports = {
    validateJWT
}