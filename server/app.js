require('@babel/register');
require('dotenv').config();
const express = require('express');
const path = require('path');

const { Server } = require('socket.io');
const { createServer } = require('node:http');

const serverConfig = require('./config/serverConfig');
const indexRouter = require('./routes/index.route');
const { checkUser } = require('./middleware/auth');

const app = express();

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('send_message', (data) => {
    socket.broadcast.emit('recieve_message', { text: data, author: 'roommate' });
  });
});

const PORT = 4000;
serverConfig(app);
app.use(checkUser);
app.use(express.static(path.join(__dirname, '../server/dist')));
app.use('/', indexRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(PORT, () => console.log('Server started'));

server.listen(3000, () => {
  console.log('Socket server running at port 3000');
});
