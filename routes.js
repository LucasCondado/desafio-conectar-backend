const express = require('express');
const { getUsuarios } = require('./usuariosController');
const router = express.Router();

router.get('/usuarios', getUsuarios);

module.exports = router;