const router = require('express').Router();

const authApiRouter = require('./api/auth.api.route');
const productsApiRouter = require('./api/products.api.route');
const matchesApiRouter = require('./api/matches.api.route');

router.use('/api/auth', authApiRouter);
router.use('/api/products', productsApiRouter);
router.use('/api/matches', matchesApiRouter);

module.exports = router;
