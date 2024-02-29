/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Products', [
      {
        title: 'Худи Chrome Hearts',
        description: 'обменяю, размер L',
        userId: 3,
        categoryId: 1,
        isModerated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Футболка Zara',
        description: 'размер S, вся в пятнах',
        userId: 3,
        categoryId: 2,
        isModerated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Джинсы домашние',
        description: 'размер 46, нет карманов',
        userId: 3,
        categoryId: 4,
        isModerated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Юбка зеленая',
        description: 'размер не знаю',
        userId: 4,
        categoryId: 3,
        isModerated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Джинсы серые Levis',
        description: 'размер 40, давно не ношу',
        userId: 4,
        categoryId: 4,
        isModerated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Худи из магазина смешные цены',
        description: 'размер 4XL, брал по скидке, обменяю на часы',
        userId: 5,
        categoryId: 1,
        isModerated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Футболка красная',
        description: 'размер XL, подарили, обменяю на часы',
        userId: 5,
        categoryId: 1,
        isModerated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
