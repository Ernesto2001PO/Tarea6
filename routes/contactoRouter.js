const express = require('express');
const router = express.Router();

const contactoController = require('../controllers/contactoController');

// GET /api/contacto/usuario/1
router.get('/usuario/:usuarioId', contactoController.getUserContacts);

// GET /api/contacto/1
router.get('/:contactoId', contactoController.getContactById);      

// POST /api/contacto
router.post('/', contactoController.createContact);   

// DELETE /api/contacto/1
router.delete('/:contactoId', contactoController.deleteContact);

// PUT /api/contacto
router.put('/', contactoController.updateContact);   

// GET /api/contacto
router.get('/',contactoController.getAllContactos);

module.exports = router;