const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail } = require("../controllers/productController");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(createProduct);
router.route("/products/:id").put(updateProduct).get(getProductDetail);
router.route("/products/:id").delete(deleteProduct);


module.exports = router
