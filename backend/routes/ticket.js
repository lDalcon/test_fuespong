//===============================================================================
// Imports
//===============================================================================
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearTicket, cancelarTicket, actualizarTicket } = require('../controller/ticket');
const router = Router();
//===============================================================================
// Path: api/ticket
//===============================================================================

router.post(
    '/',
    [
        check('ticnombre', 'Campo requerido: nombre').not().isEmpty(),
        check('ticcomentarios', 'Campo requerido: comentarios').not().isEmpty(),
        check('tichurid', 'Campo requerido: hurid').not().isEmpty(),
        check('ticusridcrea', 'Campo requerido: usridcrea').not().isEmpty(),
        validarCampos,
        validarJWT
    ],
    crearTicket
);

router.put(
    '/cancelar',
    [
        check('ticid', 'Campo requerido: id').not().isEmpty(),
        validarCampos,
        validarJWT
    ],
    cancelarTicket
)

router.put(
    '/:ticid',
    [
        check('ticnombre', 'Campo requerido: nombre').not().isEmpty(),
        check('ticcomentarios', 'Campo requerido: comentarios').not().isEmpty(),
        check('tichurid', 'Campo requerido: hurid').not().isEmpty(),
        check('ticusridmod', 'Campo requerido: usridmod').not().isEmpty(),
        check('ticestado', 'Campo requerido: estado').not().isEmpty(),
        validarCampos,
        validarJWT
    ],
    actualizarTicket
)

//===============================================================================
// Exports
//===============================================================================
module.exports = router;