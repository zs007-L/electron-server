const express = require("express");
const router = express.Router();
const adminServe = require("../../services/admin");
const { asyncHandler } = require("../getSendResult");

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    await adminServe.addAdmin(req.body);
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const result = await adminServe.login(req.body.loginId, req.body.loginPwd);
    return result;
  })
);

module.exports = router;
