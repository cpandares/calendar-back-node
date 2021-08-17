

const mongoose = require('mongoose');


const dbConnection = async()=>{

    try {

      await mongoose.connect(process.env.Db_CNN,
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('conectado')
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar con BD')
    }


}

module.exports ={
    dbConnection
}