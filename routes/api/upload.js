const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../../public/upload"));
  },
  filename: (req, file, cb) => {
    const timeStamp = Date.now();
    const ramdomStr = Math.random().toString(36).slice(-6);
    const ext = path.extname(file.originalname);
    const fileName = `${timeStamp}-${ramdomStr}${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: {
    fieldSize: 200 * 1024,
  },
  fileFilter(req, file, cb) {
    const extname = path.extname(file.originalname);
    const whiteList = [".jpg", ".gif", ".png"];
    if (whiteList.includes(extname)) {
      cb(null, true);
    } else {
      cb(new Error(`只支持${whiteList.toString()}文件`));
    }
  },
});

router.post("/", upload.single("img"), (req, res) => {
  const fileUrl = `/upload/${req.file.originalname}`;
  res.send({
    code: 0,
    msg: "",
    data: fileUrl,
  });
});

module.exports = router;
