const ErrorHandler = require("../util/errorhandler");
const catchAsync = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../util/jwtTokens");
const sendEmail = require("../util/sendEmail.js")

// Resister a User

exports.registerUser = catchAsync(
    async (req, res) => {

        const { name, email, password } = req.body;

        const user = await User.create({
            name, email, password,
            avatar: {
                public_id: "This is a public id",
                url: "Profileurl"
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

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/prince/password/reset${resetToken}`;

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