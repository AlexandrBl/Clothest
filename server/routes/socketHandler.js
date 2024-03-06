const { ChatMessage } = require('../db/models');

const handleSocketConnection = async (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('send_message', async (data) => {
      const { chatId, authorId, message } = data;
      if (chatId && authorId && message) {
        console.log(chatId, authorId, message);
        const chatMessage = await ChatMessage.create({ chatId, authorId, message });
      }
      socket.broadcast.emit('recieve_message', { text: data.message, author: 'roommate' });
    });
  });
};

module.exports = handleSocketConnection;
