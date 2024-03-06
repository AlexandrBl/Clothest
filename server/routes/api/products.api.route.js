/* eslint-disable max-len */
const router = require('express').Router();
const { Op } = require('sequelize');
const fileupload = require('../../utils/fileUpload');

const {

  Category, Product, ProductImage, User, City, UserProductLike, UserProductDislike,

} = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    if (res.locals.user) {
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
          { model: ProductImage },
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
          { model: ProductImage },
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
      products = await Product.findAll({ where: { userId: res.locals.user.id }, include: [{ model: ProductImage }] });
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
    const productFromDelete = await Product.findOne({ where: { id } });
    const productTitle = productFromDelete.title;

    const data = await Product.destroy({ where: { id } });
    if (data) {
      const products = await Product.findAll({ where: { userId: res.locals.user.id } });
      const user = await User.findOne({ where: { id: res.locals.user.id } });
      if (products.length === 0) {
        user.defaultProduct = 'Добавьте продукт';
        user.save();
        res.status(201).json({ message: 'ok', id: +id, defaultProduct: user.defaultProduct });
        return;
      }
      if (user.defaultProduct === productTitle) {
        user.defaultProduct = products[0].title;
        user.save();
        res.status(201).json({ message: 'ok', id: +id, defaultProduct: user.defaultProduct });
        return;
      }
      res.status(201).json({ message: 'ok', id: +id, defaultProduct: user.defaultProduct });
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

    const prod = await Product.findOne({ where: { userId: res.locals.user.id, title } });

    if (prod) {
      res.status(400).json({ message: 'У вас уже есть продукт с таким названием' });
      return;
    }

    let file = [];
    if (req.files) {
      file = req.files.images;
    } else {
      res.status(400).json({ message: 'Необходимо добавить хотя бы одну фотографию' });
      return;
    }

    if (!file) {
      res.status(400).json({ message: 'Необходимо добавить хотя бы одну фотографию' });
      return;
    }

    let imgPaths = [];
    if (Array.isArray(file)) {
      const uploadPromises = file.map(async (el) => fileupload(el, res.locals.user.id));
      imgPaths = await Promise.allSettled(uploadPromises);
    } else {
      const uploadPromises = [];
      uploadPromises.push(await fileupload(file, res.locals.user.id));
      imgPaths = await Promise.allSettled(uploadPromises);
    }

    const rejected = imgPaths.find((el) => el.status === 'rejected');

    if (rejected) {
      res.status(400).json({ message: rejected.reason });
      return;
    }

    const categoryFromDb = await Category.findOne({ where: { title: category } });

    if (!categoryFromDb) {
      res.status(400).json({ message: 'Категория не найдена' });
      return;
    }

    const categoryId = categoryFromDb.id;

    const userProducts = await Product.findOne({ where: { userId: res.locals.user.id } });

    const dbUser = await User.findOne({ where: { id: res.locals.user.id } });
    if (!userProducts) {
      dbUser.defaultProduct = title;
      await dbUser.save();
    }

    const product = await Product.create({
      title, description, categoryId, userId: res.locals.user.id,
    });

    if (imgPaths.length > 0) {
      imgPaths.forEach(async (img) => {
        await ProductImage.create({ path: img.value, productId: product.id });
      });
    }
    res.status(201).json({ message: 'Продукт успешно добавлен', product, defaultProduct: dbUser.defaultProduct });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/dislike', async (req, res) => {
  try {
    if (res.locals.user) {
      const { id } = req.body;

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

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'Продукт не найден' });
      return;
    }

    let {
      title, description, category,
    } = req.body;

    if (!res.locals.user) {
      res.status(400).json({ message: 'Необходимо зарегистрироваться, чтобы изменить карточку' });
      return;
    }

    if (!(title && description && category)) {
      res.status(400).json({ message: 'Заполните все поля' });
      return;
    }
    title = title.trim();
    description = description.trim();
    category = category.trim();

    const prod = await Product.findOne({ where: { userId: res.locals.user.id, id: +id } });

    if (!prod) {
      res.status(400).json({ message: 'Продукт не найден' });
      return;
    }

    const newCategory = await Category.findOne({ where: { title: category } });

    if (!newCategory) {
      res.status(400).json({ message: 'Категория не найдена' });
      return;
    }

    const user = await User.findOne({ where: { id: res.locals.user.id } });

    if (user.defaultProduct === prod.title) {
      prod.title = title;
      prod.description = description;
      prod.categoryId = newCategory.id;
      await prod.save();
      user.defaultProduct = title;
      await user.save();
    } else {
      prod.title = title;
      prod.description = description;
      prod.categoryId = newCategory.id;
      await prod.save();
    }

    const olgImgs = await ProductImage.findAll({ where: { productId: id } });

    let file = [];
    if (!(req.files || olgImgs.length > 0)) {
      res.status(400).json({ message: 'Необходимо добавить хотя бы одну фотографию' });
      return;
    }

    if (req.files) {
      file = req.files.images;

      let imgPaths = [];
      if (Array.isArray(file)) {
        const uploadPromises = file.map(async (el) => fileupload(el, res.locals.user.id));
        imgPaths = await Promise.allSettled(uploadPromises);
      } else {
        const uploadPromises = [];
        uploadPromises.push(await fileupload(file, res.locals.user.id));
        imgPaths = await Promise.allSettled(uploadPromises);
      }

      const rejected = imgPaths.find((el) => el.status === 'rejected');

      if (rejected) {
        res.status(400).json({ message: rejected.reason });
        return;
      }

      if (imgPaths.length > 0) {
        imgPaths.forEach(async (img) => {
          await ProductImage.create({ path: img.value, productId: id });
        });
      }
    }
    res.status(201).json({ message: 'Продукт успешно изменен', defaultProduct: user.defaultProduct });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
