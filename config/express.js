const express = require("express");
const config = require("config");
const consign = require("consign");
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = () => {
  const app = express();
  app.use(cors({ origin: "*" }));
  app.set("port", process.env.PORT);
  app.use(bodyParser.json({ limit: "50mb" }));

  consign({ cwd: "api" })
    .include("controller/util.js")
    .then("controller")
    .then("routes")
    .into(app);

  return app;
};
