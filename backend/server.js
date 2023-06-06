const dotenv = require("dotenv")

const app = require("./app");
const connectDatabase = require("./config/database");

// handling uncaught exception
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