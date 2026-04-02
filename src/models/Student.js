import mongoose from "mongoose";
import { min } from "three/src/nodes/math/MathNode.js";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    course: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    batch: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value >= new Date();
            },
            message: "Batch date must be in the future",
        },
    },
    Gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"],
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "inactive"],
        default: "active",
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ["paid", "unpaid"],
        default: "unpaid",
    },

})

const StudentModel = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default StudentModel;