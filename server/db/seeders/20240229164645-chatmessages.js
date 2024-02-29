/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('ChatMessages', [
      {
        chatId: 1,
        authorId: 3,
        message: 'Hello',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chatId: 1,
        authorId: 5,
        message: 'Hello',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chatId: 1,
        authorId: 3,
        message: 'Can we change?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chatId: 1,
        authorId: 3,
        message: 'I will pay',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chatId: 2,
        authorId: 4,
        message: 'Hello',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chatId: 2,
        authorId: 3,
        message: 'Hello, how are you?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chatId: 3,
        authorId: 4,
        message: 'Good morning',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chatId: 3,
        authorId: 5,
        message: 'Hello, are we going to swap?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chatId: 3,
        authorId: 5,
        message: 'Can we meet around 10?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chatId: 3,
        authorId: 4,
        message: 'Sure, i will text you',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('ChatMessages', null, {});
  },
};
