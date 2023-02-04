const express = require("express");
const app = express();
const productsRouter = require("./routes/admin/products");
const mongoConnect = require("./config/database").mongoConnect;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "views");
app.use(productsRouter);

mongoConnect(() => {
  app.listen(3000);
});
