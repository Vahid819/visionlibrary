import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One seat layout per user
    },

    seat: [
      {
        seatNumber: {
          type: Number,
          required: true,
        },

        isOccupied: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Seat ||
  mongoose.model("Seat", seatSchema);