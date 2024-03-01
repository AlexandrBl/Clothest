const router = require('express').Router();

const { Product } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
