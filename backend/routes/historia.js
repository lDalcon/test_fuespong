//===============================================================================
// Imports
//===============================================================================
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearHistoria } = require('../controller/historia');
const router = Router();
//===============================================================================
// Path: api/auth
//===============================================================================

router.post(
    '/',
    [
        check('hurnombre', 'Campo requerido: nombre').not().isEmpty(),
        check('hurrole', 'Campo requerido: role').not().isEmpty(),
        check('hurfuncionalidad', 'Campo requerido: funcionalidad').not().isEmpty(),
        check('hurbeneficio', 'Campo requerido: beneficio').not().isEmpty(),
        check('hurcriaceptacion', 'Campo requerido: criaceptacion').not().isEmpty(),
        check('hurproid', 'Campo requerido: proid').not().isEmpty(),
        check('hurusridcrea', 'Campo requerido: usridcrea').not().isEmpty(),
        check('ticnombre', 'Campo requerido: nombre').not().isEmpty(),
        check('ticcomentarios', 'Campo requerido: comentarios').not().isEmpty(),
        validarCampos,
        validarJWT
    ],
    crearHistoria
);


//===============================================================================
// Exports
//===============================================================================
module.exports = router;