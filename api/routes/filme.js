module.exports = (app) => {
  const controller = require("../controller/filme")();

  app.route("/api/v1/filmes").post(controller.filtrar);
  app
    .route("/api/v1/filme")
    .get(controller.getFilme)
    .put(controller.updateFilme)
    .post(controller.insertFilme);

  app.route("/api/v1/filme/locacao").put(controller.locarFilme);
  app.route("/api/v1/filme/devolucao").put(controller.devolverFilme);
};
