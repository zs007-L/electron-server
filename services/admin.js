const md5 = require("md5");
const Admin = require("../models/Addmin");

exports.addAdmin = async function (admin) {
  admin.loginPwd = md5(admin.loginPwd);
  const ins = await Admin.create(admin);
  console.log(ins);
};

exports.login = async function (loginId, loginPwd) {
  loginPwd = md5(loginPwd);
  const result = await Admin.findOne({
    attributes: ["id", "loginId"],
    where: {
      loginId,
      loginPwd,
    },
  });
  if (result && result.loginId === loginId) {
    return result.toJSON();
  }
  return null;
};
