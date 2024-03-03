/* eslint-disable no-throw-literal */
const path = require('path');
const util = require('util');
const fs = require('fs/promises');

const storage = async (file, userId) => {
  const fileName = file.name;
  const size = file.data.length;
  const extension = path.extname(fileName);

  const allowedExtensions = /png|jpeg|jpg|gif|webp/;

  if (!allowedExtensions.test(extension)) throw 'Неправильный формат файла';

  if (size > 5000000) throw 'Файл должен быть меньше 5 МБ';

  const { md5 } = file;

  await fs.mkdir(`./public/img/${userId}`, { recursive: true });

  const URL = `/img/${userId}/${md5}${extension}`;
  await util.promisify(file.mv)(`./public${URL}`);
  return URL;
};

module.exports = storage;
