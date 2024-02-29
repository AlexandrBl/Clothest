/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Cities', [
      {
        name: 'Санкт-Петербург',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Москва',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Cities', null, {});
  },
};
