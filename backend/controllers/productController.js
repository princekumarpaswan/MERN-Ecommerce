const Product = require("../models/productModel");
const ErrorHandler = require("../util/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Apifeatures = require("../util/apiFeatures");



// Create Product --Admin
exports.createProduct = catchAsyncError(
    async (req, res, next) => {
        const product = await Product.create(req.body);

        res.status(200).json({
            sucess: true,
            product
        })
    }
)

// get all product


exports.getAllProducts = catchAsyncError(
    async (req, res) => {
        const apiFeature = new Apifeatures(Product.find(), req.query).search()

        const products = await apiFeature.query;

        res.status(201).json({
            sucess: true,
            products
        })
    }
)

// Update Product --Admin

exports.updateProduct = catchAsyncError(
    async (req, res, next) => {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(500).json({
                sucess: false,
                message: "Product not found"
            })
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            sucess: true,
            product
        })
    }
)

// Delete product

exports.deleteProduct = catchAsyncError(
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(500).json({
                sucess: false,
                message: "product not found"
            })
        }

        await product.deleteOne()

        res.status(200).json({
            sucess: true,
            message: "Product Deleted"
        })
    }
)

// get single product details

exports.getProductDetail = catchAsyncError(
    async (req, res, next) => {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("product not found", 404))
        }

        res.status(200).json({
            sucess: true,
            product
        })


    }
)