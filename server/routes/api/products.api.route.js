const router = require('express').Router();
const fileupload = require('../../utils/fileUpload');

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
      title, description, category,
    } = req.body;

    if (!res.locals.user) {
      res.status(400).json({ message: 'Необходимо зарегистрироваться, чтобы добавить карточку' });
      return;
    }

    if (!(title && description && category)) {
      res.status(400).json({ message: 'Заполните все поля' });
      return;
    }
    title = title.trim();
    description = description.trim();
    category = category.trim();

    const file = req.files.images;

    if (!file) {
      res.status(400).json({ message: 'Необходимо добавить хотя бы одну фотографию' });
      return;
    }

    const categoryFromDb = await Category.findOne({ where: { title: category } });

    if (!categoryFromDb) {
      res.status(400).json({ message: 'Категория не найдена' });
      return;
    }

    const categoryId = categoryFromDb.id;
    const product = await Product.create({
      title, description, categoryId, userId: res.locals.user.id,
    });

    const imgPaths = [];

    if (Array.isArray(file)) {
      file.forEach(async (el) => {
        imgPaths.push(await fileupload(el, res.locals.user.id));
      });
    } else {
      imgPaths.push(await fileupload(file, res.locals.user.id));
    }

    imgPaths.forEach(async (path) => {
      await ProductImage.create({ path, productId: product.id });
    });

    res.status(201).json({ message: 'Продукт успешно добавлен', product });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
