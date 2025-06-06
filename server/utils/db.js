const mongoose = require("mongoose");

// const URI = 'mongodb://localhost:27017/mern-admin';

// mongoose.connect(URI);

const URI = process.env.MONGOGB_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connection successful to database");
    } catch (error) {
        console.error("database connection failed");
        process.exit(0);
    }
};

module.exports = connectDb;