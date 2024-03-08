const { ChatMessage } = require('../db/models');

const handleSocketConnection = async (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id}: joined room ${roomId}`);
    });

    socket.on('send_message', async (data) => {
      const { chatId, authorId, message } = data;
      if (chatId && authorId && message) {
        const chatMessage = await ChatMessage.create({ chatId, authorId, message });
        io.to(chatId).emit('receive_message', { text: message, author: authorId });
      }
    });

    socket.on('leave_room', (roomId) => {
      socket.leave(roomId);
      console.log(`User ${socket.id}: left room ${roomId}`);
    });

    socket.on('disconnect', () => {
      console.log(`User ${socket.id}: disconnected`);
    });
  });
};

module.exports = handleSocketConnection;
