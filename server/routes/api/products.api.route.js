const router = require('express').Router();

const {
  Category, Product, ProductImage, User, City,
} = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: User, include: { model: City } },
      ],
    });
    res.json(products);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post('/', async (req, res) => {
  try {
    let {
      title, description, category, images,
    } = req.body;
    
    if (!res.locals.user) {
      res.status(400).json({ message: 'Необходимо зарегистрироваться, чтобы добавить карточку' });
      return;
    }

    if (!(title && description && category && images)) {
      res.status(400).json({ message: 'Заполните все поля' });
      return;
    }
    title = title.trim();
    description = description.trim();
    category = category.trim();
    images = images.trim();

    const categoryFromDb = await Category.findOne({ where: { title: category } });

    if (!categoryFromDb) {
      res.status(400).json({ message: 'Категория не найдена' });
      return;
    }
    const categoryId = categoryFromDb.id;
    const product = await Product.create({
      title, description, categoryId, userId: res.locals.user.id,
    });
    const productImg = ProductImage.create({ path: images, productId: product.id });

    res.status(201).json({ message: 'Confirm', product, productImg });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
