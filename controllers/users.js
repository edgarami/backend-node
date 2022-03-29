const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const bcrypt = require('bcryptjs/dist/bcrypt')
const { generateJWT } = require('../helpers/jwt')

//obtener usuario
const getUser = async (req, res) => {

    const user = await User.find({}, 'nombre email role ')

    res.json({user, uid: req.uid })
}

//crear usuario
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

        //generar el token jwt

        const token = await generateJWT( User.id );
    
        res.json({ user, token })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado '
        })
    }

   
}

//actualizar campos del usuario
const updatedUser = async (req, res) => {

    const uid = req.params.id

    try {

        const userDB = await User.findById( uid )

        if( !userDB ){
            return res.status(400).json({
                msg: 'No existe un usuario por ese id'
            });
        }

        //Actualizaciones

        const campos = req.body;
        
        if( userDB.email === req.body.email ){
            delete campos.email;
        }else{
            const emailExist = await User.findOne({ email: req.body.email })

            if( emailExist ){
                return res.status(400).json({
                    msg: 'Ya existe un usuario con este mail'
                });
            }
        }


        delete campos.password;

        const userUpdated = await User.findByIdAndUpdate( uid, campos, {new: true} );

        res.json({
            user: userUpdated
        });

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'error inesperado'
        })
    }
}

//borrar usuario
const deleteUser = async (req, res) =>{

    const uid = req.params.id;
    try {
        const userDB = await User.findById( uid )

        if( !userDB ){
            return res.status(400).json({
                msg: 'No existe un usuario por ese id'
            });
        }

        //eliminar usuario directamente de la base de datos
        await User.findByIdAndDelete( uid );

        res.json({
            msg:' usuario eliminado '
        })
    } catch (error) {

        console.log(error)
        res.status(500).json({
            msg:'error inesperado'
        })
    };

}


module.exports = {
    getUser,
    createUser,
    updatedUser,
    deleteUser
}