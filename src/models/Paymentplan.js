import mongoose from "mongoose";

const paymentPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One payment plan document per library
    },

    plans: [
      {
        planName: {
          type: String,
          required: true,
          trim: true,
        },

        planAmount: {
          type: Number,
          required: true,
          min: 1,
        },

        totalPlan: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PaymentPlan =  mongoose.models.PaymentPlan ||
  mongoose.model("PaymentPlan", paymentPlanSchema);

  export default PaymentPlan;