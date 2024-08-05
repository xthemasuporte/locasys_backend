module.exports = () => {
  const controller = {};
  const util = require("./util")();
  const { ObjectId } = require("mongodb");

  controller.filtrar = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const skip = (page - 1) * limit;

      const collection = await util.getCollection("filmes");
      const filtro = req.body;
      const items = await collection
        .find(filtro)
        .sort({ titulo: 1 })
        .skip(skip)
        .limit(limit)
        .toArray();
      const total = await collection.countDocuments(filtro);

      return res.status(200).json({
        items,
        total,
        paginas: Math.ceil(total / limit),
        paginaAtual: page,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ mensagem: "Ocorreu um erro ao filtrar filmes." });
    }
  };

  controller.getFilme = async (req, res) => {
    try {
      const _id = new ObjectId(req.query.id) || "";
      const collection = await util.getCollection("filmes");
      const item = await collection.findOne(_id);

      return res.status(200).json(item);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ mensagem: "Ocorreu um erro ao buscar filme." });
    }
  };

  controller.updateFilme = async (req, res) => {
    try {
      const _id = new ObjectId(req.query.id) || "";
      const collection = await util.getCollection("filmes");
      const filme = req.body;
      delete filme._id;

      const item = await collection.updateOne({ _id }, { $set: filme });

      return res.status(200).json({
        item,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ mensagem: "Ocorreu um erro ao atualizar o filmes." });
    }
  };

  controller.insertFilme = async (req, res) => {
    try {
      const collection = await util.getCollection("filmes");
      const filme = req.body;
      delete filme._id;

      filme.codigo = await util.getCodigo("filmes");

      const item = await collection.insertOne(filme);

      return res.status(200).json({
        id: item.insertedId,
        codigo: filme.codigo,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ mensagem: "Ocorreu um erro ao inserir o filmes." });
    }
  };

  movimentacaoFilme = async (_id, quantidade) => {
    const collection = await util.getCollection("filmes");

    const item = await collection.updateOne(
      { _id },
      { $inc: { quantidade_disponivel: quantidade } }
    );

    return item;
  };

  controller.locarFilme = async (req, res) => {
    try {
      const _id = new ObjectId(req.query.id) || "";
      const body = req.body;
      const item = await movimentacaoFilme(_id, -1);
      const collectionLocacoes = await util.getCollection("locacoes");
      await collectionLocacoes.insertOne({
        filmeId: _id,
        qtdDias: body["qtdDias"],
      });

      return res.status(200).json({
        item,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ mensagem: "Ocorreu um erro ao realizar a locação do filme." });
    }
  };

  controller.devolverFilme = async (req, res) => {
    try {
      const _id = new ObjectId(req.query.id) || "";
      const item = await movimentacaoFilme(_id, 1);
      return res.status(200).json({
        item,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        mensagem: "Ocorreu um erro ao realizar a devolução do filme.",
      });
    }
  };

  return controller;
};
