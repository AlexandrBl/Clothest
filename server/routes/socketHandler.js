const { ChatMessage } = require('../db/models');

const handleSocketConnection = async (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`, 111111111111);
    });

    socket.on('send_message', async (data) => {
      const { chatId, authorId, message } = data;
      if (chatId && authorId && message) {
        const chatMessage = await ChatMessage.create({ chatId, authorId, message });
        // socket.broadcast.emit('recieve_message', { text: data.message, author: 'roommate' });
        io.to(chatId).emit('receive_message', { text: message, author: authorId });
      }
    });

    socket.on('leave_room', (roomId) => {
      socket.leave(roomId);
      console.log(`User ${socket.id} left room ${roomId}`, 2222222222);
    });

    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected`);
    });
  });
};

module.exports = handleSocketConnection;
