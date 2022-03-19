const mongoose = require('mongoose')

const dbConnnection = async() => {
  try {
    await mongoose.connect(process.env.DB_CNN,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
     });
     console.log( ' db oONLine')

  } catch (error){
    console.log(error)
    throw new Error('  error ed ')
  }


}

module.exports = {
  dbConnnection
}