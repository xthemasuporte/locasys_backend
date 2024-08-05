module.exports = () => {
  const controller = {};
  const util = require("./util")();
  const { ObjectId } = require("mongodb");
  const jsonwebtoken = require("jsonwebtoken");
  const config = require("config");

  controller.login = async (req, res) => {
    try {
      const collection = await util.getCollection("usuarios");
      const usuario = req.body.usuario;
      const senha = req.body.senha;

      const item = await collection.findOne({ usuario, senha });

      let token = jsonwebtoken.sign(
        { usuario: usuario.usuario, nome: usuario.nome },
        process.env.PRIVATE_KEY,
        { expiresIn: "60m" }
      );

      if (item) {
        return res.status(200).json({
          message: "Usuario Logado com Sucesso",
          token,
        });
      } else {
        return res.status(401).json({
          message: "Usuario/Senha Invalido",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensagem: "Ocorreu um erro ao logar" });
    }
  };

  return controller;
};
