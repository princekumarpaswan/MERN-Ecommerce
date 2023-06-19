const dotenv = require("dotenv")
const app = require("./app");
const connectDatabase = require("./config/database");
const cloudnary = require("cloudinary");
// const cors = require("cors");
// const helmet = require('helmet')



// app.use(helmet())
// app.use(cors());


//handling uncaught exception
process.on("uncaughtException", (error) => {
    console.log(`error: ${error.message}`);
    console.log(`uncaught exception`);
    process.exit(1);
})

// configration
dotenv.config({ path: "./backend/config/congif.env" })
const port = process.env.PORT || 4000;

// connecting to database
connectDatabase()


// Cloudnary
cloudnary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const server = app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
})

// unhandled promise rejection when in .env file mongodb url is not correct

process.on("unhandledRejection", error => {
    console.log(`Error: ${error.message}`);
    console.log(`Sutting Down the surver due to unhandeled promiss rejection`);

    server.close(() => {
        process.exit(1);
    })
})