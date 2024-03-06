require('@babel/register');
require('dotenv').config();
const express = require('express');
const path = require('path');
const serverConfig = require('./config/serverConfig');
const indexRouter = require('./routes/index.route');
const { checkUser } = require('./middleware/auth');

const app = express();
const PORT = 4000;
serverConfig(app);
app.use(checkUser);

app.use(express.static(path.join(__dirname, '../server/dist')));

app.use('/', indexRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(PORT, () => console.log('Server started'));
