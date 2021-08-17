

/* 
    Rutas Auth
    host + /api/auth
*/

const express = require('express');
const { register, login, renew } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateForm } = require('../middlewares/validate-auth');
const { validateJWT } = require('../middlewares/validate-token');

const router = express.Router();



 router.post(
    '/register',
    [
        check('name','Name is required').notEmpty(),
        check('email','Email is required').isEmail(),
        check('password','Password is required').isLength({ min:5 }),
        validateForm
    ],
    register );


router.post(
        '/',
        [        
        check('email','Email is required').isEmail(),
        check('password','Password is required').notEmpty(),
        validateForm
        ],
login);
 


router.get('/renew',validateJWT, renew);
 
 

module.exports = router