const jwt = require('jsonwebtoken');

const generateJWT = (uid, name)=>{

    return new Promise( ( resolve, reject ) =>{

        const payload = { uid, name }

        jwt.sign( payload, process.env.SECRET_JWT_WORD,{
            expiresIn: '2h'
        },(error,token)=>{

            if(error){
                console.log(error);
                reject('No token generated');
            }


            resolve( token );

        })

    })


}


module.exports = {
    generateJWT
}