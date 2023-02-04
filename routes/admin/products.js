var express = require("express");
var router = express.Router();
var productsController = require("../../controllers/admin/productsController");

router.get("/products/list", productsController.productsList);
router.post("/products/add", productsController.addProduct);
router.put("/products/update", productsController.productUpdate);
router.delete("/products/delete", productsController.productDelete);

module.exports = router;
