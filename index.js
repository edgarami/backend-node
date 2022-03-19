const express = require('express');
require('dotenv').config();
const { dbConnnection } = require('./database/config')
const cors = require('cors')

//crear servidor express
const app = express()


// configurar cors
app.use(cors())

//leer y parsear dele body
app.use( express.json())

//Base de datos
dbConnnection();

console.log( process.env )

app.use('/api/users', require('./routes/userRoutes'));

app.listen(  process.env.PORT , () => {
  console.log(`servidor corriendo en el puerto ${process.env.PORT}`)
})