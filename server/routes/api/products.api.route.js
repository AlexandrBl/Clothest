/* eslint-disable max-len */
/* eslint-disable radix */
const router = require('express').Router();
const { Op } = require('sequelize');
const fileupload = require('../../utils/fileUpload');

const {

  Category, Product, ProductImage, User, City, UserProductLike, Favorite, UserProductDislike,

} = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    if (res.locals.user) {
      console.log(1111111111111);
      const userLikes = await UserProductLike.findAll({ where: { userId: res.locals.user.id } });
      const userDislike = await UserProductDislike.findAll({ where: { userId: res.locals.user.id } });

      const likesArr = userLikes.map((el) => el.productId);
      const dislikeArr = userDislike.map((el) => el.productId);

      const newSet = new Set([...likesArr, ...dislikeArr]);
      const resultArr = Array.from(newSet);

      const products = await Product.findAll({
        offset: req.query.page,
        limit: req.query.pageSize,
        include: [
          { model: User, include: { model: City } },
        ],
        where: {
          id: { [Op.notIn]: resultArr },
          userId: { [Op.ne]: res.locals.user.id },
        },
      });
      res.json(products);
    } else {
      const products = await Product.findAll({
        offset: req.query.page,
        limit: req.query.pageSize,
        include: [
          { model: User, include: { model: City } },
        ],
      });
      res.json(products);
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/userProducts', async (req, res) => {
  try {
    let products = [];
    if (res.locals.user) {
      products = await Product.findAll({ where: { userId: res.locals.user.id } });
      res.json(products);
    } else {
      res.json(products);
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.destroy({ where: { id } });
    if (data) {
      res.status(201).json({ message: 'ok', id: +id });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
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

    const userProducts = await Product.findOne({ where: { userId: res.locals.user.id } });

    if (!userProducts) {
      const dbUser = await User.findOne({ where: { id: res.locals.user.id } });
      dbUser.defaultProduct = title;
      await dbUser.save();
    }

    const prod = await Product.findOne({ where: { userId: res.locals.user.id, title } });

    if (prod) {
      res.status(400).json({ message: 'У вас уже есть продукт с таким названием' });
      return;
    }

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

router.post('/dislike', async (req, res) => {
  try {
    if (res.locals.user) {
      const { id } = req.body;

      // eslint-disable-next-line max-len
      let dislike = await UserProductDislike.findOne({ where: { userId: res.locals.user.id, productId: id } });

      if (!dislike) {
        dislike = await UserProductDislike.create({ userId: res.locals.user.id, productId: id });
        res.status(201).json({ message: 'success' });
      }
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
