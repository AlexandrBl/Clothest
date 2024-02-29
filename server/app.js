require('@babel/register');
require('dotenv').config();
const express = require('express');
const serverConfig = require('./config/serverConfig');
const indexRouter = require('./routes/index.route');
const { checkUser } = require('./middleware/auth');

const app = express();
const PORT = 4000;
serverConfig(app);
app.use(checkUser);
app.use('/', indexRouter);

app.listen(PORT, () => console.log('Server started'));
