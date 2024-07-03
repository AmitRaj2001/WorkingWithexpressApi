const mongoose = require("mongoose");


mongoose.set("strictQuery", true);
async function connectMongodb(url) {
    return mongoose
        .connect(url)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log("Error connecting to MongoDB", err);
        });
}


module.exports = {
    connectMongodb,
};