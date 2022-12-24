import mongoose from "mongoose";

const connectDb = (dbUrl) => {
    mongoose.set("strictQuery", false);
    mongoose.connect(dbUrl);
    mongoose.connection.on("connected", () => console.log("Connected to DB"));
    mongoose.connection.on("error", () =>
        console.log("Error in db connection")
    );
};
const disconnectFromDb = () => {
    mongoose.disconnect(() => console.log("Disconnected from DB"));
};

export { connectDb, disconnectFromDb };
