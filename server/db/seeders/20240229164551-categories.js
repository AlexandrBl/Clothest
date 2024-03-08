/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Categories', [
      {
        title: 'Штаны',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Джинсы',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Брюки',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Футболки',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Кроссовки',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Туфли',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Кепки',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Куртки',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Худи',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Шарфы',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Другое',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
