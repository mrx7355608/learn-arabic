const mongoose = require("mongoose");

const connectDb = (dbUrl) => {
    mongoose.set("strictQuery", false);
    mongoose.connect(dbUrl);
    mongoose.connection.on("connected", () => console.log("Connected to DB"));
    mongoose.connection.on("error", () =>
        console.log("Error in db connection")
    );
};

module.exports = connectDb;
