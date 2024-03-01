const router = require('express').Router();

const authApiRouter = require('./api/auth.api.route');
const productsApiRouter = require('./api/products.api.route');

router.use('/api/auth', authApiRouter);
router.use('/api/products', productsApiRouter);

module.exports = router;
