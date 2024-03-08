const { User } = require('../db/models');

const ifNotAuthRedirect = (req, res, next) => {
  if (!res.locals.user) {
    res.redirect('/auth');
  } else {
    next();
  }
};

const checkUser = async (req, res, next) => {
  if (res.locals.user) {
    res.locals.user = await User.findByPk(Number(res.locals.user.id), {
      raw: true,
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
  } next();
};

module.exports = { ifNotAuthRedirect, checkUser };
