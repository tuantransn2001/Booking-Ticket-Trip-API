const express = require("express");
const path = require("path");
const { sequelize } = require("./models");
const { rootRouter } = require("./routers");
const Fingerprint = require("express-fingerprint");
const app = express();

//cài đặt Fingerprint
app.use(Fingerprint());

// cài ứng dụng sử dụng kiểu json
app.use(express.json());

// cài static file
const publicPathDirectory = path.join(__dirname, "./public");
app.use("/public", express.static(publicPathDirectory));

// dùng router
app.use("/api/v1", rootRouter);

// lắng nghe sự kiện kết nối
const port = 8080;
app.listen(port, async () => {
  console.log(`App listening on http://localhost:${port}`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
