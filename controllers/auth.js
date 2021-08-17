const { response } =  require('express');
const bcrypt = require('bcryptjs');
const{ generateJWT } = require('../helpers/jwt');
const User = require('../models/User');

 const register = async( req, res = response )=>{

    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email });

        if(user){
            return res.status(400).json({
                ok:false,
                msg:'Email already taken'
            });
        }
        
        user = new User( req.body );    

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password,salt);

        await user.save();
        //Generart JWT

        const token = await generateJWT( user.id, user.name );

       res.status(201).json({
           ok:true,
           id: user.id,
           name:user.name,
           token
          
       })
    } catch (error) {
      return res.status(500).json({
            ok:false,
            msg:'Something wrong'
        })
    }

}

const login = async ( req, res = response  )=>{

    

    const { email, password  } = req.body;

    try {

        let user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                ok:false,
                msg:'Email not exist'
            });
        }

        const validPassword = bcrypt.compareSync( password,user.password );

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Password not exist'
            });
        }

        //Generart JWT
        const token = await generateJWT( user.id, user.name );
        res.json({
            ok:true,
            id:user.id,
            name:user.name,
            token
            
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Something wrong'
        })
        
    }

   

}

const renew = async ( req, res = response  )=>{

    const { uid, name } = req;
    
    const token = await generateJWT( uid, name );

    res.json({
        ok:true,
        token
    })
}


module.exports = {
    register,
    login,
    renew
}
