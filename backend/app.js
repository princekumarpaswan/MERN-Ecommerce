const express = require("express");
const app = express();

const errorhandler = require("./middleware/error")

app.use(express.json());

// Route import
const product = require("./routes/productRoute")

app.use("/api/prince", product);

// middel ware for errer
app.use(errorhandler)

module.exports = app