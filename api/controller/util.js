const { ObjectId } = require("mongodb");
const config = require("config");

module.exports = () => {
  const controller = {};

  controller.getCollection = async (collection_name) => {
    var MongoClient = require("mongodb").MongoClient;
    //1º Acessar o Servidor
    let con = await MongoClient.connect(process.env.DB_HOST);
    //2º Acessar o Banco de Dados
    let db = await con.db(process.env.DB_DATABASE);
    //3º Acessar a Coleção
    let collection = await db.collection(collection_name);
    return collection;
  };

  controller.getCodigo = async (collection_name) => {
    colParametros = await controller.getCollection("parametros");
    const options = { upsert: true, returnDocument: "after" };
    const value = await colParametros.findOneAndUpdate(
      { _id: collection_name },
      { $inc: { codigo: 1 } },
      options
    );
    return value["codigo"];
  };

  return controller;
};
