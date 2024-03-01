const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChatMessage extends Model {
    static associate({ Chat, User }) {
      this.belongsTo(Chat, { foreignKey: 'chatId' });
      this.belongsTo(User, { foreignKey: 'authorId' });
    }
  }
  ChatMessage.init({
    chatId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Chats',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
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
    message: {
      allowNull: false,
      type: DataTypes.TEXT,
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
    modelName: 'ChatMessage',
  });
  return ChatMessage;
};
