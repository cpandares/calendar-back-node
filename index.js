
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config();


const app = express();

//BD
dbConnection();

//Cors
app.use(cors());

//Directorio public
app.use( express.static('public') )

//Parseo del body
app.use( express.json() );

//Rutas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(process.env.PORT, ()=>{

    console.log('server en puerto 4000');
})