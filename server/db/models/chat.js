const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate({ User, ChatMessage }) {
      this.belongsTo(User, { foreignKey: 'userId1', as: 'User1' });
      this.belongsTo(User, { foreignKey: 'userId2', as: 'User2' });
      this.hasMany(ChatMessage, { foreignKey: 'chatId' });
    }
  }
  Chat.init({
    userId1: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'SET DEFAULT',
      defaultValue: 1,
    },
    userId2: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'SET DEFAULT',
      defaultValue: 1,
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
    modelName: 'Chat',
  });
  return Chat;
};
