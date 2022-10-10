const express = require("express");
const path = require("path");
// 浏览器history模式刷新页面会报404
const history = require("connect-history-api-fallback");
const cors = require("cors");

const app = express();

app.use(history());

const staticRoot = path.resolve(__dirname, "./public");
app.use(express.static(staticRoot));

// 解析 application/x-www-form-urlencoded 格式的请求
app.use(express.urlencoded({ extended: true }));
// 解析 application/json 格式的请求
app.use(express.json());

// 处理浏览器跨域
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, "*");
        return;
      }
      callback(null, origin);
    },
    credentials: true,
  })
);

// 处理api请求
app.use("/api/upload", require("./routes/api/upload"));
app.use("/api/admin", require("./routes/api/admin"));

app.listen(3000);

require("./models/init");
