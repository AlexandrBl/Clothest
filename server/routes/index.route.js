const router = require('express').Router();

const authApiRouter = require('./api/auth.api.route');
const productsApiRouter = require('./api/products.api.route');
const productImagesApiRouter = require('./api/productImages.api.route');
const matchesApiRouter = require('./api/matches.api.route');
const categoriesApiRouter = require('./api/categories.api.route');
const favoritesApiRouter = require('./api/favorites.api.route');
const chatsApiRouter = require('./api/chats.api.route');

router.use('/api/auth', authApiRouter);
router.use('/api/products', productsApiRouter);
router.use('/api/productImages', productImagesApiRouter);
router.use('/api/matches', matchesApiRouter);
router.use('/api/categories', categoriesApiRouter);
router.use('/api/favorites', favoritesApiRouter);
router.use('/api/chats', chatsApiRouter);

module.exports = router;
