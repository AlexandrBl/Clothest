/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
const router = require('express').Router();
const { Match, UserProductLike, Favorite } = require('../../db/models');

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

module.exports = router;
