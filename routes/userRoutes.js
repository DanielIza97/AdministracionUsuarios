const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Registrar usuario y enviar OTP
router.post('/register', userController.registerUser);

// Verificar OTP
router.post('/verify', userController.verifyOTP);

// Renovar OTP
router.post('/renew-otp', userController.renewOTP);

// Obtener usuario por ID
router.get('/:id', userController.getUser);

module.exports = router;
