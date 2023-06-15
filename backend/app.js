const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorhandler = require("./middleware/error");
const bodyParser = require("body-parser")
const fileUploader = require("express-fileupload")
const dotenv = require("dotenv")


// config
dotenv.config({ path: "./backend/config/congif.env" })


app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUploader());

// Route import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/prince", product);
app.use("/api/prince", user)
app.use("/api/prince", order)
app.use("/api/prince", payment)




// middel ware for errer
app.use(errorhandler)


module.exports = app