import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        console.log("✅ Already connected to the database");
        return;
    }

    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/bg-removal`);
        console.log("✅ Database Connected:", db.connection.name);
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1); // Optional: exit process on failure
    }
};

export default connectDB;
