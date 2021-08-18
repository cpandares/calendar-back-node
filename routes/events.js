
/* 
    Rutas evens
    host + /api/events
*/

const express = require('express');
const { validateJWT } = require('../middlewares/validate-token');
const { getEvents, createEvents, updateEvents, deleteEvents } = require('../controllers/events');
const { check } = require('express-validator');
const { validateForm } = require('../middlewares/validate-auth');

const { isDate } = require('../helpers/isDate');

const router = express.Router();
router.use( validateJWT );

router.get('/', getEvents);

router.post(
        '/',
        [
            check('title','title is require').notEmpty(),
            check('start','start date is require').custom( isDate ),
            check('end','end date is require').custom( isDate ),
            validateForm
        ],
         createEvents
        );

router.put('/:id', updateEvents);
router.delete('/:id', deleteEvents);



module.exports = router