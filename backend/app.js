const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const errorhandler = require("./middleware/error")

app.use(express.json());
app.use(cookieParser())

// Route import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/prince", product);
app.use("/api/prince", user)
app.use("/api/prince", order)



// middel ware for errer
app.use(errorhandler)


module.exports = app