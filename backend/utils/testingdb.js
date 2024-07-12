const mysql = require("mysql2");
const { generateToken, verifyToken } = require("./token")

// const connection = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "comodoto",
//   database: "vicar",
// });

// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err.stack);
//     return;
//   }
//   console.log("Connected to the database as id " + connection.threadId);
// });

console.log(
  verifyToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTcyMDc1OTUwMywiZXhwIjoxNzIwODQ1OTAzfQ.35JnD0GTOkb3jB-6mAhdEffN9Sbv63RUkEtHVO5M5_4"
  )
);
