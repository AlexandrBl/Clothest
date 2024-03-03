/* eslint-disable radix */
const router = require('express').Router();
const fileupload = require('../../utils/fileUpload');

const {
  Category, Product, ProductImage, User, City, UserProductLike,
} = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    let products = await Product.findAll({
      include: [
        { model: User, include: { model: City } },
      ],
      offset: req.query.page,
      limit: req.query.pageSize,
    });

    // надо поправить, – если лайкнуть первые 8 карточек, карточки перестанут загружаться, тк они все отфильтровываются ниже
    // если делать пагинацию после фильтрации, тогда не загружаются по скроллу
    const userLikes = await UserProductLike.findAll({ where: { userId: res.locals.user.id } });
    if (userLikes) {
      const likedProductIds = userLikes.map((like) => like.productId);
      products = products.filter((product) => !likedProductIds.includes(product.id));
    }
    // до сюда новый функционал
    res.json(products);
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

module.exports = router;
