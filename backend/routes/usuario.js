//===============================================================================
// Imports
//===============================================================================
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actualizarPass } = require('../controller/usuario');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
//===============================================================================
// Path: api/usuario
//===============================================================================

router.get('/', validarJWT, getUsuarios);

router.post(
    '/',
    [
        check('usremail', 'El email es obligatorio').isEmail(),
        check('usrnombre', 'El nombre es obligatorio').not().isEmpty(),
        check('usrpass', 'La contraseña es obligatoria').not().isEmpty(),
        check('usrempid', 'La empresa es obligatoria').not().isEmpty(),
        validarCampos
    ],
    crearUsuario
);

router.put(
    '/',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('pass', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos,
        validarJWT
    ],
    actualizarPass
)

//===============================================================================
// Exports
//===============================================================================
module.exports = router;