const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../Controller/AuthController'); // 👈 Include logout

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout); // 👈 Add this line

module.exports = router;
