//===============================================================================
// Imports
//===============================================================================
const jwt = require('jsonwebtoken');
//===============================================================================
// Funtions
//===============================================================================
const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'El token es obligatorio'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SEED)
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Token no valido'
        });
    }
}

//===============================================================================
// Exports
//===============================================================================

module.exports = {
    validarJWT
}