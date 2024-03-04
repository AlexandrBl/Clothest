const router = require('express').Router();

const { Category } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (!categories) {
      res.status(500).json({ message: 'Categories not found' });
      return;
    }
    res.status(200).json(categories);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
