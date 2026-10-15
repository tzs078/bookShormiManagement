const mongoose = require("mongoose");

let cachedDb = null;

const connectDb = async () => {
    if (cachedDb) {
        return cachedDb;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Serverless er jonno extra options lagte pare
        });
        cachedDb = conn;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDb;