const router = require('express').Router();

const authApiRouter = require('./api/auth.api.route');
const productsApiRouter = require('./api/products.api.route');
const matchesApiRouter = require('./api/matches.api.route');
const categoriesApiRouter = require('./api/categories.api.route');

router.use('/api/auth', authApiRouter);
router.use('/api/products', productsApiRouter);
router.use('/api/matches', matchesApiRouter);
router.use('/api/categories', categoriesApiRouter);

module.exports = router;
