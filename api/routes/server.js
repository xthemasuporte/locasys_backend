module.exports = (app) => {
  const controller = require("../controller/server")();
  app.route("/").get(controller.check);
};
