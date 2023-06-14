const ErrorHandler = require("../util/errorhandler");
const catchAsync = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../util/jwtTokens");
const sendEmail = require("../util/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary")

// Resister a User

exports.registerUser = catchAsync(
    async (req, res, next) => {

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        })


        const { name, email, password } = req.body;

        const user = await User.create({
            name, email, password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        });


        sendToken(user, 201, res)


    }
)

exports.loginUser = catchAsyncError(
    async (req, res, next) => {
        const { email, password } = req.body;

        // checking if user has given password and email both
        if (!email || !password) {
            return next(new ErrorHandler("Please Enter Email & Password", 400));
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid email or password"))
        }

        const isPasswordMatched = user.comparePassword(password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        sendToken(user, 200, res)


    }
)

// logout usre

exports.logout = catchAsync(
    async (req, res, next) => {

        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })

        res.status(200).json({
            sucess: true,
            message: "Logged Out"
        })
    }
)


// forgot Passord

exports.forgotPassword = catchAsyncError(
    async (req, res, next) => {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return next(new ErrorHandler("USer not found", 404))
        }
        // Get RessetPassword tokens

        const resetToken = user.getResetPasswordToken()

        await user.save({ validateBeforeSave: false })

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset${resetToken}`;

        const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nif you have not requested this emailthen, please ignore it`

        try {

            await sendEmail({
                email: user.email,
                subject: `Ecommerce Password Recovery`,
                message,

            })

            res.status(200).json({
                sucess: true,
                message: `Email sent to ${user.email} sucessfully`
            })

        } catch (error) {
            user.resetPasswordtoken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            return next(new ErrorHandler(error.message, 500))
        }

    }
)

// Reset Password

exports.resetPassword = catchAsyncError(
    async (req, res, next) => {

        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 404));
        }

        if (req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler("Password dose not match password", 400));
        }

        user.password = req.body.password;
        user.resetPasswordtoken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save()

        sendToken(user, 200, res);

    }
)

// Get User details

exports.getUserDetails = catchAsyncError(
    async (req, res) => {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            sucess: true,
            user,
        })
    }
)

// Update user password
exports.updatePassword = catchAsyncError(
    async (req, res, next) => {
        const user = await User.findById(req.user.id).select("+password");

        const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Old password is incorrect", 400))
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            return next(new ErrorHandler("Password doesnot match", 400))
        }

        user.password = req.body.newPassword;

        await user.save()

        sendToken(user, 200, res)



        res.status(200).json({
            sucess: true,
            user,
        })
    }
)

// Update user Profile
exports.updateProfile = catchAsyncError(
    async (req, res, next) => {

        const newUserData = {
            name: req.body.name,
            email: req.body.email
        }

        // we will add cloudinary 

        if (req.body.avatar !== "") {
            const user = await User.findById(req.user.id);

            const imageId = user.avatar.public_id;

            await cloudinary.v2.uploader.destroy(imageId)

            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale"
            })

            newUserData.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };



        }



        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })


        res.status(200).json({
            sucess: true,
        })




    }
)


// Get all user
exports.getAllUser = catchAsyncError(
    async (re, res, next) => {
        const user = await User.find();

        res.status(200), json({
            sucess: true,
            user,
        }
        )
    }
)

// get single details (admin)
exports.getSingleUser = catchAsyncError(
    async (req, res, next) => {
        const user = User.findById(req.params.id);

        if (!user) {
            return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`))
        }


        res.status(200), json({
            sucess: true,
            user,
        }
        )
    }
)

// Update user Role
exports.updateUserRole = catchAsyncError(
    async (req, res) => {

        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        }

        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            sucess: true,
        })
    }
)


// Delete user (admin)
exports.deleteUser = catchAsyncError(
    async (req, res, next) => {

        const user = await User.findById(req.params.id);

        // we will remove cloudinary later


        if (!user) {
            return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`))
        }

        await user.remove();

        res.status(200).json({
            sucess: true,
        })
    }
)