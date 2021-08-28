//===============================================================================
// Imports
//===============================================================================
const { Router } = require('express');
const { getEmpresas } = require('../controller/empresa');
const router = Router();
//===============================================================================
// Path: api/empresa
//===============================================================================

router.get('/', getEmpresas);

//===============================================================================
// Exports
//===============================================================================
module.exports = router;