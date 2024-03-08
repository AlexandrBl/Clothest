const router = require('express').Router();

const { ProductImage } = require('../../db/models');

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ProductImage.destroy({ where: { id } });

    if (data) {
      res.status(201).json({ message: 'confirm', id: +id });
    } else {
      res.status(400).json({ message: 'Фотография не найдена' });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
