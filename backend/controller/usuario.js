//===============================================================================
// Imports
//===============================================================================
const { getPool } = require("../database/config")
const sql = require('mssql');
const bcrypt = require('bcryptjs');
//===============================================================================
// Funtions
//===============================================================================

const getUsuarios = async (req, res) => {
    try {
        let pool = getPool();
        if (!pool.conected) await pool.connect();
        let result = await pool.request()
            .execute('sp_usuario_listar');
        res.status(200).json({
            ok: true,
            usuarios: result.recordset
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error no controlado'
        })
    }
}

const crearUsuario = async (req, res) => {
    try {
        let pool = getPool();
        let { usrpass } = req.body;
        /*Encriptar contraseña */
        const salt = bcrypt.genSaltSync();
        usrpass = bcrypt.hashSync(usrpass, salt);
        let result = await pool.request()
            .input('usremail', sql.VarChar(100), req.body.usremail)
            .input('usrnombre', sql.VarChar(100), req.body.usrnombre)
            .input('usrpass', sql.VarChar(4000), usrpass)
            .input('usrempid', sql.INT, req.body.usrempid)
            .output('mensaje', sql.VarChar(4000))
            .execute('sp_usuario_crear')
        return res.status(200).json({
            ok: true,
            message: result.output.mensaje
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Error no controlado'
        });
    }
}

const actualizarPass = async (req, res) => {
    try {
        let pool = getPool();
        let { pass } = req.body;
        const salt = bcrypt.genSaltSync();
        pass = bcrypt.hashSync(pass, salt);
        let result = await pool.request()
            .input('id', sql.Int(), req.body.id)
            .input('email', sql.VarChar(100), req.body.email)
            .input('pass', sql.VarChar(100), pass)
            .output('mensaje', sql.VarChar(4000))
            .execute('sp_usuario_actualizarPass')
        if (result.output.mensaje) {
            return res.status(400).json({
                ok: false,
                message: result.output.mensaje
            });
        }
        return res.status(200).json({
            ok: true,
            message: 'Usuario Actualizado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error no controlado'
        });
    }
}
//===============================================================================
// Exports
//===============================================================================

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarPass
}