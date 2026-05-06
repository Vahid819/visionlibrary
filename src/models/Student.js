import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    // Personal Info
    firstName:      { type: String, required: true, trim: true },
    lastName:       { type: String, required: true, trim: true },
    phone:          { type: String, required: true, trim: true },
    email:          { type: String, trim: true, lowercase: true },
    dob:            { type: String },
    gender:         { type: String, enum: ["Male", "Female", "Other", "Prefer not to say", ""] },
    address:        { type: String },
    emergencyName:  { type: String },
    emergencyPhone: { type: String },
    photo:          { type: String }, // URL or base64

    // Seat & Membership
    seat:           { type: Number, required: true },
    plan:           { type: String, enum: ["Weekly", "Monthly", "Yearly"], required: true },
    joinDate:       { type: String, required: true },
    expiryDate:     { type: String },
    paymentStatus:  { type: String, enum: ["Paid", "Pending", "Failed"], default: "Pending" },
    shift:          { type: String },
    idType:         { type: String },
    idNumber:       { type: String },
    notes:          { type: String },

    // Meta
    isActive:       { type: Boolean, default: true },
    createdBy:      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Auto-calculate expiry date based on plan
StudentSchema.pre("save", function (next) {
  if (this.joinDate && this.plan) {
    const join = new Date(this.joinDate);
    if (this.plan === "Weekly")  join.setDate(join.getDate() + 7);
    if (this.plan === "Monthly") join.setMonth(join.getMonth() + 1);
    if (this.plan === "Yearly")  join.setFullYear(join.getFullYear() + 1);
    this.expiryDate = join.toISOString().split("T")[0];
  }
  next();
});

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
