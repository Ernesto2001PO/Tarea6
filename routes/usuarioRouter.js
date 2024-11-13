const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

//POST /api/usuario/login
router.post('/login', usuarioController.login);

// POST /api/
router.post('/', usuarioController.createUser);

router.get('/:usuarioId', usuarioController.getUsuariobyId);


module.exports = router;