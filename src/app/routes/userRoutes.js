const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Verificar que todos los métodos estén definidos correctamente
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUsers);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;