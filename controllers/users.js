const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const bcrypt = require('bcryptjs/dist/bcrypt')
const getUser = async (req, res) => {

    const user = await User.find({}, 'nombre email role ')

    res.json({user })
}

const createUser = async(req, res) => {

    const {email, password, name} = req.body;

   

    try {

        const emailExist = await User.findOne({ email })

        if( emailExist){
            return res.status(400).json({
                msg:' el correo ya existe'
            })
        }
        const user = new User(req.body);

        // encriptar constraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcrypt.hashSync( password, salt);

        //guardar usuario
        await user.save()
    
        res.json({ user })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado '
        })
    }

   
}

module.exports = {
    getUser,
    createUser
}