/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
const router = require('express').Router();
const { Op } = require('sequelize');
const {
  Match, UserProductLike, Favorite, Product, ProductImage, User, City,
} = require('../../db/models');

router.post('/', async (req, res) => {
  try {
    const { productId1, productId2 } = req.body;

    await UserProductLike.create({ userId: res.locals.user.id, productId: productId2 });

    const favorite = await Favorite.findOne({ where: { userId: res.locals.user.id, productId: productId2 } });

    if (favorite) {
      await Favorite.destroy({ where: { userId: res.locals.user.id, productId: productId2 } });
    }

    const updateMutualField = async (match) => {
      match.isMutual = true;
      await match.save();

      res.status(201).json({ message: 'confirm', match });
      return true;
    };

    const checkMatch = async (match, isUpdateRequired) => {
      if (match) {
        if (match.isMutual) {
          res.status(400).json({ message: 'Такое совпадение уже есть, проверьте чаты' });
          return true;
        }
        if (isUpdateRequired) {
          const result = await updateMutualField(match);
          return result;
        }
        res.status(400).json({ message: 'Такое совпадение уже есть, проверьте чаты' });
        return true;
      }
      return false;
    };

    const matchFirstAttempt = await Match.findOne({ where: { productId1, productId2 } });
    const firstResult = await checkMatch(matchFirstAttempt, false);

    if (firstResult) {
      return;
    }

    const matchSecondAttempt = await Match.findOne({ where: { productId1: productId2, productId2: productId1 } });
    const secondResult = await checkMatch(matchSecondAttempt, true);

    if (secondResult) {
      return;
    }

    if (!(firstResult && secondResult)) {
      const newPotentialMatch = await Match.create({ productId1, productId2 });

      res.status(201).json({ message: 'confirm', match: newPotentialMatch });
    } else {
      res.status(404).json({ message: 'Что-то пошло не так' });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.get('/init', async (req, res) => {
  try {
    if (res.locals.user.id) {
      const products = await Product.findAll({ where: { userId: res.locals.user.id } });
      const productsArr = products.map((el) => el.id);

      const matches1 = await Match.findAll({

        where: {
          productId1: { [Op.in]: productsArr },
          isMutual: true,
        },
      });

      const matches2 = await Match.findAll({
        where: {
          isMutual: true,
          productId2: { [Op.in]: productsArr },
        },
      });

      const resultMatches = [...matches1, ...matches2];

      const resultMatchesPromise = resultMatches.map(async (obj) => {
        const matchesCouple = [];
        for (const key in obj.dataValues) {
          if (key === 'productId1') {
            const prod1 = await Product.findOne({
              include: [
                { model: ProductImage },
                { model: User, include: { model: City } },
              ],
              where: {
                id: obj[key],
              },
            });
            matchesCouple.push(prod1);
          }
          if (key === 'productId2') {
            const prod2 = await Product.findOne({
              include: [
                { model: ProductImage },
                { model: User, include: { model: City } },
              ],
              where: {
                id: obj[key],
              },
            });
            matchesCouple.push(prod2);
          }
        }
        return matchesCouple;
      });
      const preResult = await Promise.allSettled(resultMatchesPromise);

      const result = preResult.map((el) => el.value.map((product) => product.dataValues));
      res.status(201).json({ message: 'ok', matches: result });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
