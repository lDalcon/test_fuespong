//===============================================================================
// Imports
//===============================================================================
const { getPool } = require("../database/config")
const sql = require('mssql');
//===============================================================================
// Funtions
//===============================================================================
const crearTicket = async (req, res) => {
    try {
        let pool = getPool();
        let result = await pool.request()
            .input('ticnombre', sql.VarChar(1000), req.body.ticnombre)
            .input('ticcomentarios', sql.VarChar(4000), req.body.ticcomentarios)
            .input('tichurid', sql.Int(), req.body.tichurid)
            .input('ticusridcrea', sql.Int(), req.body.ticusridcrea)
            .output('mensaje', sql.VarChar(4000))
            .output('ticket', sql.VarChar(sql.MAX))
            .execute('sp_ticket_crear')
        return res.status(200).json({
            ok: true,
            proyectos: JSON.parse(result.output.ticket)
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Error no controlado'
        })
    }
}

const cancelarTicket = async (req, res) => {
    try {
        let pool = getPool();
        let result = await pool.request()
            .input('ticid', sql.Int(), req.body.ticid)
            .output('mensaje', sql.VarChar(4000))
            .execute('sp_ticket_cancelar')
        return res.status(200).json({
            ok: true,
            message: result.output.mensaje
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Error no controlado'
        })
    }
}

const actualizarTicket = async (req, res) => {
    try {
        let pool = getPool();
        let result = await pool.request()
            .input('ticid', sql.Int(), req.body.ticid)
            .input('tichurid', sql.Int(), req.body.tichurid)
            .input('ticnombre', sql.VarChar(1000), req.body.ticnombre)
            .input('ticcomentarios', sql.VarChar(4000), req.body.ticcomentarios)
            .input('ticusridmod', sql.Int(), req.body.ticusridmod)
            .input('ticestado', sql.Int(), req.body.ticestado)
            .output('mensaje', sql.VarChar(4000))
            .execute('sp_ticket_actualizar')
            console.log(result)
            console.log(req.body)
        return res.status(200).json({
            ok: true,
            message: result.output.mensaje
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Error no controlado'
        })
    }
}
//===============================================================================
// Exports
//===============================================================================
module.exports = {
    crearTicket,
    cancelarTicket,
    actualizarTicket
}