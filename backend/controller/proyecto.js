//===============================================================================
// Imports
//===============================================================================
const { getPool } = require("../database/config")
const sql = require('mssql');
//===============================================================================
// Funtions
//===============================================================================
const getProyectos = async (req, res) => {
    try {
        let pool = getPool();
        let result = await pool.request()
            .input('empid', req.params.empid)
            .output('proyectos', sql.VarChar(sql.MAX))
            .execute('sp_proyecto_listar')
        return res.status(200).json({
            ok: true,
            proyectos: JSON.parse(result.output.proyectos)
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
    getProyectos
}