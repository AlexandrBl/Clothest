/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Chats', [
      {
        userId1: 3,
        userId2: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId1: 3,
        userId2: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId1: 3,
        userId2: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId1: 4,
        userId2: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId1: 4,
        userId2: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId1: 5,
        userId2: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Chats', null, {});
  },
};
