
const { Router }= require('express');
const { getUser, createUser, updatedUser, deleteUser } = require('../controllers/users')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/field-validate')
const router = Router();

router.get('/', getUser); 

router.post('/',
 [
    //midleware
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'la contraseña es requira').not().isEmpty(),
    check('email', 'el correo es obligatorio').isEmail(),
    validateFields,

 ], createUser)

 router.put('/:id', 
   [
      check('nombre', 'el nombre es obligatorio').not().isEmpty(),
      check('email', 'el correo es obligatorio').isEmail(),
      validateFields,
   ],
   updatedUser
 ); 

router.delete('/:id', 
   [
      check('nombre', 'el nombre es obligatorio').not().isEmpty(),
      check('email', 'el correo es obligatorio').isEmail(),
      validateFields,

   ],
deleteUser); 









module.exports = router