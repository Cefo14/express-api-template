const express = require('express');

const router = express.Router();

const { login, logout } = require('../../controllers/auth');
const { login: loginValidator } = require('../../validators/auth');

router.post('/login', loginValidator(), login);
router.get('/logout', logout);

module.exports = router;
