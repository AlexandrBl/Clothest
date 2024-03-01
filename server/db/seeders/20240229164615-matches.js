/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Matches', [
      {
        productId1: 2,
        productId2: 6,
        isMutual: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId1: 3,
        productId2: 5,
        isMutual: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId1: 2,
        productId2: 4,
        isMutual: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId1: 6,
        productId2: 5,
        isMutual: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Matches', null, {});
  },
};
