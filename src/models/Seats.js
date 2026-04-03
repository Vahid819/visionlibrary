import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
    seatNumber: {
        type: String,
        required: true,
        unique: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    studentName: {
        type: String,
        default: "",
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
        default: Date.now,
    },
})

const Seat = mongoose.models.Seat || mongoose.model("Seat", seatSchema);
export default Seat;