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

// router.get('/messages', async (req, res) => {

// });

module.exports = router;
