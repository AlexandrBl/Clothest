/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('ProductImages', [
      {
        path: 'img/placeholder.jpeg',
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: 'img/placeholder.jpeg',
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: 'img/placeholder.jpeg',
        productId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: 'img/placeholder.jpeg',
        productId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: 'img/placeholder.jpeg',
        productId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: 'img/placeholder.jpeg',
        productId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: 'img/placeholder.jpeg',
        productId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: 'img/placeholder.jpeg',
        productId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: 'img/placeholder.jpeg',
        productId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: 'img/placeholder.jpeg',
        productId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: 'img/placeholder.jpeg',
        productId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: 'img/placeholder.jpeg',
        productId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: 'img/placeholder.jpeg',
        productId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: 'img/placeholder.jpeg',
        productId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('ProductImages', null, {});
  },
};
