const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    static associate({ Product }) {
      this.belongsTo(Product, { foreignKey: 'productId' });
    }
  }
  ProductImage.init({
    path: {
      allowNull: false,
      type: DataTypes.TEXT,
      defaultValue: '/img/placeholder.png',
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
    modelName: 'ProductImage',
  });
  return ProductImage;
};
