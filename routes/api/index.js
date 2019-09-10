
const router = require('express').Router();

const { optional, required } = require('../../middlewares/auth');
const authRoutes = require('./auth');
const usersRoutes = require('./users');

router.use('/', optional, authRoutes);
router.use('/users', required, usersRoutes);

module.exports = router;
