const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

// console.log('porss', process.env.DATABASE);
// const DB = process.env.DATABASE.replace(
//   '<password>',
//   process.env.DATABASE_PASSWORD,
// );

const DB = 'mongodb://localhost:27017/express-db';

mongoose
  .connect(DB)
  .then(() => console.log('資料庫連線成功'))
  .catch((error) => console.log(error.reason));
