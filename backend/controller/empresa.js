//===============================================================================
// Imports
//===============================================================================
const { getPool } = require("../database/config")
const sql = require('mssql');
//===============================================================================
// Funtions
//===============================================================================
const getEmpresas = async (req, res) => {
    try {
        let pool = getPool();
        let result = await pool.request()
            .output('empresas', sql.VarChar(sql.MAX))
            .execute('sp_empresa_listar')
        return res.status(200).json({
            ok: true,
            empresas: JSON.parse(result.output.empresas)
        })
       
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
    getEmpresas
}