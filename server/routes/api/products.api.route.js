const router = require('express').Router();
const { Category, Product, ProductImage } = require('../../db/models');

router.post('/', async (req, res) => {
  try {
    let {
      title, description, category, images,
    } = req.body;
    if (!(title && description && category && images)) {
      res.status(400).json({ message: 'Заполните все поля' });
    }
    title = title.trim();
    description = description.trim();
    category = category.trim();
    images = images.trim();

    const categoryFromDb = await Category.findOne({ where: { title: category } });
    if (!categoryFromDb) {
      res.status(400).json({ message: 'Категория не найдена' });
    }

    const categoryId = categoryFromDb.id;
    const product = Product.create({
      title, description, categoryId, userId: res.locals.user.id,
    });

    const productImg = ProductImage.create({ path: images, productId: product.id });

    res.status(201).json({ message: 'Confirm', product, productImg });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
