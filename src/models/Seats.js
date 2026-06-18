import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    seat: [
      {
        seatNumber: {
          type: Number,
          required: true,
          unique: true,
        },
        isOccupied: {
            type: Boolean,
            default: false,
        },
      },
    ],
    seatUpdatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Seat = mongoose.models.Seat || mongoose.model("Seat", seatSchema);
export default Seat;
