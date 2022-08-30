const { createPool } = require("mysql");
const pool = createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10,
  multipleStatements: true

});
// const pool = createPool({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "",
//   database: "stickerapp",
//   connectionLimit: 10,
//   multipleStatements: true
// });

module.exports = pool;
