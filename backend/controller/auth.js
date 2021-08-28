//===============================================================================
// Imports
//===============================================================================
const { getPool } = require("../database/config")
const sql = require('mssql');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");
//===============================================================================
// Funtions
//===============================================================================
const login = async (req, res) => {
    try {
        let pool = getPool();
        let result = await pool.request()
            .input('usremail', sql.VarChar(100), req.body.usremail)
            .output('usuario', sql.VarChar(4000))
            .execute('sp_usuario_login')
        if (result.output.usuario) {
            let usuario = JSON.parse(result.output.usuario)[0];
            const validPass = bcrypt.compareSync(req.body.usrpass, usuario.usrpass);
            if (validPass) {
                delete usuario.usrpass;
                /*Generar token*/
                const token = await generarJWT(usuario.usrid);
                return res.status(200).json({
                    ok: true,
                    usuario,
                    token
                });
            } else {
                res.status(404).json({
                    ok: false,
                    message: 'Credenciales incorrectas'
                });
            }
        } else {
            res.status(404).json({
                ok: false,
                message: 'Credenciales incorrectas'
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Error no controlado'
        })
    }
}

const renewToken = async (req, res) => {
    const token = await generarJWT(req.uid);
    res.status(200).json({
        ok: true,
        token
    })
}
//===============================================================================
// Exports
//===============================================================================
module.exports = {
    login,
    renewToken
}