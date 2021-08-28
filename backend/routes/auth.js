//===============================================================================
// Imports
//===============================================================================
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { login, renewToken } = require('../controller/auth');
const router = Router();
//===============================================================================
// Path: api/auth
//===============================================================================

router.post(
    '/',
    [
        check('usremail', 'El email es obligatorio').isEmail(),
        check('usrpass', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
);

router.get('/renewToken', validarJWT, renewToken);

//===============================================================================
// Exports
//===============================================================================
module.exports = router;