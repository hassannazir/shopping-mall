const Product = require("../../models/product");

module.exports = {
  productsList: async function (req, res, next) {
    const product = new Product("dummy", "test", 121);

    const prods = await product.getProducts();
    console.log("TEST", prods);
    // const products=
    // [
    //     {title:"Play station"},
    //     {title:"xbox"}
    // ]
    res.render("admin/products", { prods: prods });
  },

  addProduct: async function (req, res, next) {
    const { title, price, description } = req.body;

    const product = new Product({
      title: title,
      price: price,
      description: description,
    });

    await product.save();
    // const product = new Product(title, "test", 121);
    // product.save();
    res.send("Show product here");
  },

  productDelete: function (req, res, next) {
    const { productId } = req.query;
    Product.deleteProduct(productId);
    res.send(`Delete product here/?id=${productId}`);
  },

  productUpdate: function (req, res, next) {
    const { productId, title } = req.body;
    Product.updateProduct(productId, title);
    res.send("update product here");
  },
};
