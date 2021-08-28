//===============================================
// Imports
//===============================================

require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
const path = require('path');

const app = express();

/* Configurar CORS */
app.use(cors());
/* Lectura y parseo del body */
app.use(express.json());

//===============================================
// Base de datos
//===============================================

dbConnection();

//===============================================
// Rutas
//===============================================
app.use(express.static('public'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/empresa', require('./routes/empresa'));
app.use('/api/historia', require('./routes/historia'));
app.use('/api/proyecto', require('./routes/proyecto'));
app.use('/api/ticket', require('./routes/ticket'));
app.use('/api/usuario', require('./routes/usuario'));

app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
})
//===============================================
// App
//===============================================
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})


