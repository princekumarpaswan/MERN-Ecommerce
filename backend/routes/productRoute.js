const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(isAuthenticatedUser, authorizeRole("admin"), createProduct);
router.route("/products/:id").put(isAuthenticatedUser, authorizeRole("admin"), updateProduct).get(getProductDetail);
router.route("/products/:id").delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);


module.exports = router
