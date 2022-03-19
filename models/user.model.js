const {Schema, model} = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        require: true,
        unique:true
    },
    email: {
        type: String,
        require: true,
        unique:true

    },
    password:{
        type: String,
        require: true

    },
    avatar: {
        type: String,

    },
    role:{
        type:String,
        default: 'USER_ROLE'

    }
});

userSchema.method('toJSON', function () {
    const {__v, _id, ...object} =  this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model( 'User', userSchema)