//===============================================================================
// Imports
//===============================================================================
const { getPool } = require("../database/config")
const sql = require('mssql');
//===============================================================================
// Funtions
//===============================================================================
const crearHistoria = async (req, res) => {
    try {
        let pool = getPool();
        let result = await pool.request()
            .input('hurnombre', sql.VarChar (1000), req.body.hurnombre)
            .input('hurrole', sql.VarChar(100), req.body.hurrole)
            .input('hurfuncionalidad', sql.VarChar (1000), req.body.hurfuncionalidad)
            .input('hurbeneficio', sql.VarChar (1000), req.body.hurbeneficio)
            .input('hurcriaceptacion', sql.VarChar(4000),req.body.hurcriaceptacion)
            .input('hurcomentarios', sql.VarChar(4000),req.body.hurcomentarios)
            .input('hurproid', sql.Int(),req.body.hurproid)
            .input('hurusridcrea', sql.Int(),req.body.hurusridcrea)
            .input('ticnombre', sql.VarChar (1000), req.body.ticnombre)
            .input('ticcomentarios', sql.VarChar(4000),req.body.ticcomentarios)
            .output('mensaje', sql.VarChar(4000))
            .output('historia_usuario', sql.VarChar(sql.MAX))
            .execute('sp_historia_crear')
        return res.status(200).json({
            ok: true,
            proyectos: JSON.parse(result.output.historia_usuario)
        })
       
    } catch (error) {
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
    crearHistoria
}