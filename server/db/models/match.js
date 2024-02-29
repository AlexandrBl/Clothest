const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    static associate({ Product }) {
      this.belongsTo(Product, { foreignKey: 'productId1' });
      this.belongsTo(Product, { foreignKey: 'productId2' });
    }
  }
  Match.init({
    productId1: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    productId2: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    isMutual: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    modelName: 'Match',
  });
  return Match;
};
