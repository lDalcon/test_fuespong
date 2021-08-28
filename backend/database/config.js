//===============================================================================
// Imports
//===============================================================================

const mssql = require('mssql');
require('dotenv').config();
let pool;

const dbconfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true
    }
}


dbConnection = async () => {
    try {
        pool = new mssql.ConnectionPool(dbconfig);
        await pool.connect();
        console.log('DB Online')
    } catch (error) {
        console.log(error);
        throw new Error('Error en al conectar la base de datos')
    }
}

getPool = () => {
    return pool;
}
//===============================================================================
// Exports
//===============================================================================

module.exports = {
    dbConnection,
    getPool
}