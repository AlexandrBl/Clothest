const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserProductDislike extends Model {
    static associate({ User, Product }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Product, { foreignKey: 'productId' });
    }
  }
  UserProductDislike.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id',
      },
      onDelete: 'CASCADE',
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
    modelName: 'UserProductDislike',
  });
  return UserProductDislike;
};
