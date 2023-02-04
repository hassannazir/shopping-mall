const fs = require("fs");
const { ObjectId } = require("mongodb");
const path = require("path");
const getDb = require("../config/database").getDb;

//const filePath=path.join(require.main.fileName,"data","products.json")
const filePath = path.join(__dirname, "../", "data", "products.json");

const readFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) reject([]);
      else {
        resolve(JSON.parse(fileContent));
      }
    });
  });
};

module.exports = class Product {
  constructor(title, imageDescription, price) {
    // this.id = id;
    this.title = title;
    this.imageDescription = imageDescription;
    this.price = price;
  }
  async save() {
    const db = getDb();
    await db.collection("products").insertOne({ title: this.title });
  }
  async getProducts() {
    const db = getDb();

    const products = await db.collection("products").find().toArray();
    console.log("PRODUCT LIST", products);
    // const products = await readFile();
    // // console.log("PRODUCTS", products)
    return products;
  }
  static async updateProduct(productId, title) {
    const db = getDb();
    await db
      .collection("products")
      .updateOne({ _id: new ObjectId(productId) }, { $set: { title: title } });
  }
  static async deleteProduct(productId) {
    const db = getDb();
    await db.collection("products").deleteOne({ _id: new ObjectId(productId) });
  }
};
