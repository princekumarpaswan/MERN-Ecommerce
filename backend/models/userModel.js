const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "name cannot excide 30 charcters"],
        minLength: [4, "Name should have more then 4 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator: [validator.isEmail, "please enter a valid email"]
    },
    password: {
        type: String,
        require: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },

    resetPasswordtoken: String,
    resetPasswordExpire: Date,

})

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)

})
// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Compair PAssword

userSchema.methods.comparePassword = async function (enteredPassowrd) {
    return await bcrypt.compare(enteredPassowrd, this.password)
}

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {

    // Generating Password Reset Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // hassing and adding to user schema

    this.resetPasswordtoken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

    return resetToken;
}


module.exports = mongoose.model("user", userSchema)