const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("electron-app", "root", "123123", {
  host: "localhost",
  dialect: "mysql",
});

(async function () {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("error:", error);
  }
})();

module.exports = sequelize;
