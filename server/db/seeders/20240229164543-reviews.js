/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Reviews', [
      {
        authorId: 3,
        rate: 4,
        description: 'хороший человек',
        userId: 4,
        isModerated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorId: 4,
        rate: 5,
        description: 'супер, быстро встретились, поменялись',
        userId: 5,
        isModerated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorId: 5,
        rate: 2,
        description: 'игнорирует, не договорились о встрече',
        userId: 3,
        isModerated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Reviews', null, {});
  },
};
