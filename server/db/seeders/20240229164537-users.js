/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const hash = await bcrypt.hash('qwerty1', 10);
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Пользователь удален',
        email: 'noemail@clothest.ru',
        password: hash,
        cityId: '1',
        userpic: '/img/userpicdefault.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Admin',
        email: 'a@a.ru',
        password: hash,
        cityId: '1',
        userpic: '/img/userpicdefault.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sanya',
        email: 's@s.ru',
        password: hash,
        cityId: '1',
        userpic: '/img/sanya.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Diana',
        email: 'd@d.ru',
        password: hash,
        cityId: '1',
        userpic: '/img/diana.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pasha',
        email: 'p@p.ru',
        password: hash,
        cityId: '1',
        userpic: '/img/pasha.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Viktor',
        email: 'v@v.ru',
        password: hash,
        cityId: '1',
        userpic: '/img/userpicdefault.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
