const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const { verifyAccessToken } = require('../middleware/verifyAccessToken');

const configServer = (app) => {
  app.use(fileUpload());
  app.use(cookieParser());
  app.use(verifyAccessToken);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(express.static(path.join(__dirname, '../public')));
  app.use(morgan('dev'));
};

module.exports = configServer;
