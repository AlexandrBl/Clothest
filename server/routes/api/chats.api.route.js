const router = require('express').Router();
const { Op } = require('sequelize');
const { Chat, User, ChatMessage } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const userChats = await Chat.findAll({
      where: {
        [Op.or]: [
          { userId1: res.locals.user.id },
          { userId2: res.locals.user.id },
        ],
      },
      include: [
        { model: User, as: 'User2' },
        { model: User, as: 'User1' },
        { model: ChatMessage },
      ],
    });
    res.status(200).json(userChats);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.get('/:id/newmessages', async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'что-то пошло не так' });
    }

    id = +id;

    if (Number.isNaN(id)) {
      res.status(400).json({ message: 'что-то пошло не так' });
    }

    const newMessages = await ChatMessage.findAll({ where: { chatId: id } });
    if (!newMessages) {
      res.status(400).json({ message: 'сообщений нет' });
    }
    res.status(200).json(newMessages);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/check', async (req, res) => {
  try {
    const { userIds } = req.body;
    console.log(userIds)
    const chat = await Chat.findOne({
      where: {
        [Op.or]: [
          { userId1: userIds[0], userId2: userIds[1] },
          { userId1: userIds[1], userId2: userIds[0] },
        ],
      },
    });
    if (chat) {
      res.status(200).json({ message: 'чат уже существует' });
      return;
    }
    console.log(chat)
    const createdChat = await Chat.create({ userId1: userIds[0], userId2: userIds[1] });
    if (createdChat) {
      console.log(createdChat)
      res.status(201).json({ message: 'Создан новый чат' });
      return;
    }
    console.log(createdChat)
    res.status(500).json({ message: 'что-то пошло не так' });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
