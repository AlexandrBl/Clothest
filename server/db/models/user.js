const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({
      City, Review, Chat, ChatMessage, Product,
    }) {
      this.belongsTo(City, { foreignKey: 'cityId' });
      this.hasMany(Review, { foreignKey: 'authorId' });
      this.hasMany(Review, { foreignKey: 'userId' });
      this.hasMany(Chat, { foreignKey: 'userId1' });
      this.hasMany(Chat, { foreignKey: 'userId2' });
      this.hasMany(ChatMessage, { foreignKey: 'authorId' });
      this.hasMany(Product, { foreignKey: 'userId' });
    }
  }
  User.init({
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    email: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    cityId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cities',
        key: 'id',
      },
    },
    rating: {
      allowNull: false,
      type: DataTypes.TEXT,
      defaultValue: 'Нет отзывов',
    },
    isAdmin: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userpic: {
      allowNull: false,
      type: DataTypes.TEXT,
      defaultValue: '/img/placeholder.jpeg',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
