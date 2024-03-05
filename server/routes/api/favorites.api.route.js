const router = require('express').Router();
const { Op } = require('sequelize');
const {
  Favorite, Product, User, City, UserProductLike, UserProductDislike,
} = require('../../db/models');

router.post('/addFavorite', async (req, res) => {
  try {
    const { idProduct, idUser } = req.body;
    const favorite = await Favorite.create({ userId: idUser, productId: idProduct });
    const product = await Product.findOne({
      include: [
        { model: User, include: { model: City } },
      ],
      where: {
        id: idProduct,
      },
    });
    if (favorite && product) {
      res.status(201).json({ message: 'success', product });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.findAll({ where: { userId: res.locals.user.id } });
    if (!favorites) {
      res.status(500).json({ message: 'Favorites not found' });
      return;
    }
    const userLikes = await UserProductLike.findAll({ where: { userId: res.locals.user.id } });
    const userDislike = await UserProductDislike.findAll({ where: { userId: res.locals.user.id } });

    const likesArr = userLikes.map((el) => el.productId);
    const dislikeArr = userDislike.map((el) => el.productId);
    const newSet = new Set([...likesArr, ...dislikeArr]);
    const resultArr = Array.from(newSet);

    let favsId = favorites.map((el) => el.productId);

    favsId = favsId.filter((el) => !resultArr.includes(el));

    const products = await Product.findAll({
      include: [
        { model: User, include: { model: City } },
      ],
      where: {
        id: { [Op.in]: favsId },
      },
    });

    res.status(201).json(products);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
