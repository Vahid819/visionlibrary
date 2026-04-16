import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    row:{
        type: Number,
        required: true
    },
    column: {
        type: Number,
        required: true
    },
    seat : [
        {
            seatNumber: {
                type: String,
                required: true, 
                unique: true
            },
            isAvailable: {
                type: Boolean,
                default: true
            }
        }
    ],
    seatUpdatedAt: {
        type: Date,
        default: Date.now
    },
},
{
    timestamps: true
})

const Seat = mongoose.models.Seat || mongoose.model("Seat", seatSchema);
export default Seat;