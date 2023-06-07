const sendToken = (user, statusCode, res) => {

    const token = user.getJWTToken();

    // options fro cokie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 100
        ),
        httpOnly: true
    }


    res.status(statusCode).cookie("token", token, options).json({
        sucess: true,
        user,
        token,
    })


}

module.exports = sendToken;