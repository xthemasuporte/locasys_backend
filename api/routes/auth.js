module.exports = (app) => {
  const controller = require("../controller/auth")();

  app.route("/api/v1/auth/login").post(controller.login);
};
