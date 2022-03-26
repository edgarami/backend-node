const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')

const login = async(req, res ) => {

    const { email, password } = req.body;

    try {

        //verificar email
        const userDB = await User.findOne({ email });

        if ( ! userDB ){
            return res.status(404).json({
                msg: ' email no valida'
            });
        }

        // verificar contraseña 

        const validPassword = bcryptjs.compareSync( password, userDB.password)
        if( !validPassword ) {
            return res.status(404).json({
                msg: ' Contraseña no valida'
            });
        }


        //generar el token jwt



        res.json({
            msg: 'Hola mundito'
        });
        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            msg: 'ocurrio un error en el auth'
        })
        
    }
}

module.exports = {
    login
}