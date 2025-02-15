const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database running on: ${connection.connection.host}:${connection.connection.port}`);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

module.exports = connectDB;