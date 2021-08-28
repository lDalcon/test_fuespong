//===============================================================================
// Imports
//===============================================================================
require('dotenv').config();
const jwt = require('jsonwebtoken')
//===============================================================================
// Funtions
//===============================================================================
const generarJWT = (uid) => {
    
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        }
        jwt.sign(payload, process.env.JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT')
            } else {
                resolve(token)
            }
        })
    });
}
//===============================================================================
// Funtions
//===============================================================================
module.exports = {
    generarJWT
}