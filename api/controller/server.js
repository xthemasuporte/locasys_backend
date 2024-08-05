module.exports = () => {
  const controller = {};

  controller.check = (req, res) => {
    try {
      return res.status(200).json({ status: "ok", version: "1.0" });
    } catch (error) {
      return res
        .status(500)
        .json({ mensagem: "Ocorreu um erro ao filtrar filmes." });
    }
  };

  return controller;
};
