const Product = require("../models/productModel");
const ErrorHandler = require("../util/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Apifeatures = require("../util/apiFeatures");



// Create Product --Admin
exports.createProduct = catchAsyncError(
    async (req, res, next) => {

        req.body.user = req.user.id;

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

        const resultPerPage = 8;
        const productsCount = await Product.countDocuments();


        const apiFeature = new Apifeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)

        const products = await apiFeature.query;

        res.status(201).json({
            sucess: true,
            products,
            productsCount,
            resultPerPage
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

// Create New Review or Update the review
exports.createProductReview = catchAsyncError(
    async (req, res, next) => {

        const { rating, comment, productId } = req.body

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment,
        };

        const product = await Product.findById(productId);

        const isReviewed = product.reviews.find(rev => rev.user.toSting() === req.user._id)


        if (isReviewed) {

            product.reviews.forEach(rev => {

                if (rev.user.toString() === req.user._id.toString())

                    rev.rating = rating,
                        rev.comment = comment
            })


        } else {
            product.reviews.push(review)
            product.numOfReviews = product.reviews.length
        }

        let avg = 0;

        product.reviews.forEach(rev => {
            avg += rev.rating
        })


        product.ratings = avg / product.reviews.length

        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            sucess: true,
        })

    }
)

// get all reviews of a single product

exports.getProductReviews = catchAsyncError(
    async (req, res, next) => {
        const product = await Product.findById(req.uery.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404))
        }

        res.status(200).json({
            sucess: true,
            reviews: product.reviews
        })
    }
)

// Delete Product review
exports.deleteReviews = catchAsyncError(
    async (req, res, next) => {
        const product = await Product.findById(req.uery.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404))
        }

        const reviews = product.reviews.filter(rev => rev._id.toSting() !== req.query.id.toSting())

        let avg = 0;

        reviews.forEach(rev => {
            avg += rev.rating
        })


        const ratings = avg / reviews.length

        const numOfReviews = reviews.length

        await Product.findByIdAndUpdate(req.query.productId), {
            reviews,
            ratings,
            numOfReviews,
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }



        res.status(200).json({
            sucess: true,
        })
    }
)