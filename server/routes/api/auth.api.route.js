const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const { generateTokens } = require('../../utils/authUtils');
const cookieConfig = require('../../config/cookiesConfig');

router.post('/registration', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (name && email && password) {
      const globalRegex = /^[_a-z0-9-\+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i;

      if (globalRegex.test(email)) {
        let user = await User.findOne({ where: { email } });
        if (user) {
          res.status(400).json({ message: 'Такой пользователь уже существует' });
        } else {
          const hash = await bcrypt.hash(password, 10);
          user = await User.create({
            name, email, password: hash, cityId: 1,
          });
          const { accessToken, refreshToken } = generateTokens(
            { user: { name: user.name, id: user.id } },
          );

          res.cookie(
            cookieConfig.access,
            accessToken,
            { maxAge: cookieConfig.maxAgeAccess, httpOnly: true },
          );
          res.cookie(
            cookieConfig.refresh,
            refreshToken,
            { maxAge: cookieConfig.maxAgeRefresh, httpOnly: true },
          );
          // user.password.delete();
          res.status(201).json({ message: 'ok', user });
        }
      } else {
        res.status(400).json({ message: 'Ваша почта не соответствует формату' });
      }
    } else {
      res.status(400).json({ message: 'Заполните все поля' });
    }
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

router.post('/log', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ where: { email } });
      if (user && (await bcrypt.compare(password, user.password))) {
        const { accessToken, refreshToken } = generateTokens(
          { user: { name: user.name, id: user.id } },
        );

        res.cookie(
          cookieConfig.access,
          accessToken,
          { maxAge: cookieConfig.maxAgeAccess, httpOnly: true },
        );
        res.cookie(
          cookieConfig.refresh,
          refreshToken,
          { maxAge: cookieConfig.maxAgeRefresh, httpOnly: true },
        );

        res.status(201).json({ message: 'ok', user });
      } else {
        res.status(400).json({ message: 'логин или пароль неверный' });
      }
    } else {
      res.status(400).json({ message: 'Заполните все поля' });
    }
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

router.get('/out', async (req, res) => {
  res
    .clearCookie(cookieConfig.access)
    .clearCookie(cookieConfig.refresh);
  res.status(200).json({ message: 'ok', user: null });
});

router.get('/check', async (req, res) => {
  if (res.locals.user) {
    const user = await User.findOne({ where: { id: res.locals.user.id }, attributes: { exclude: ['password'] } });
    res.json({ user });
    return;
  }
  res.json({ user: null });
});

router.get('/user', async (req, res) => {
  try {
    if (res.locals.user) {
      res.status(200).json({ message: 'ok', user: res.locals.user });
    } else {
      res.status(200).json({ message: 'ok', user: null });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
