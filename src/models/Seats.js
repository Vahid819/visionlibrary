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
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},{
    timestamps: true,
})

const Seat = mongoose.models.Seat || mongoose.model("Seat", seatSchema);
export default Seat;