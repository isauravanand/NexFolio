import mongoose, { ModifiedPathsSnapshot } from "mongoose";

const resumeSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type:String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [50, "Name must not exceed 50 characters"],  
    },
    skills: String,
    experience: String,
    education: String,
    summary: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Resume", resumeSchema);
