const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'authorId' });
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Review.init({
    authorId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'SET DEFAULT',
      defaultValue: 1,
    },
    rate: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    isModerated: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
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
    modelName: 'Review',
  });
  return Review;
};
