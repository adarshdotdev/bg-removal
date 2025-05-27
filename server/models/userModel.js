import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        photo: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            trim: true,
        },
        lastName: { // ⬅️ use camelCase for consistency
            type: String,
            trim: true,
        },
        creditBalance: {
            type: Number,
            default: 5,
            min: 0,
        },
    },
    {
        timestamps: true, // ⬅️ Automatically adds createdAt and updatedAt fields
    }
);

// Use cached model to prevent recompilation in dev/hot-reload
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
