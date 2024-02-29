const router = require('express').Router();

const authApiRouter = require('./api/auth.api.route');

router.use('/api/auth', authApiRouter);

module.exports = router;
