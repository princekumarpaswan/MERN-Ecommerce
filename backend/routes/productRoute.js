const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail, createProductReview, getProductReviews, deleteReviews, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/products").get(isAuthenticatedUser, authorizeRole("admin"), getAdminProducts)
router.route("/products/new").post(isAuthenticatedUser, authorizeRole("admin"), createProduct);
router.route("/products/:id").put(isAuthenticatedUser, authorizeRole("admin"), updateProduct);
router.route("/products/:id").delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);
router.route("/products/:id").get(getProductDetail);
router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/review").get(getProductReviews).delete(isAuthenticatedUser, deleteReviews)

module.exports = router
