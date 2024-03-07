require('@babel/register');
require('dotenv').config();

const express = require('express');
const path = require('path');

const { Server } = require('socket.io');
const { createServer } = require('node:http');
const handleSocketConnection = require('./routes/socketHandler');

const serverConfig = require('./config/serverConfig');
const indexRouter = require('./routes/index.route');
const { checkUser } = require('./middleware/auth');

const app = express();

const server = createServer(app);
const io = new Server(server);

serverConfig(app);
app.use(checkUser);
app.use(express.static(path.join(__dirname, '../server/dist')));
app.use('/', indexRouter);

handleSocketConnection(io);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log('Server running at port 4000');
});
