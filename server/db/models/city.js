const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate({ User }) {
      this.hasMany(User, { foreignKey: 'cityId' });
    }
  }
  City.init({
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    modelName: 'City',
  });
  return City;
};
