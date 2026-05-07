// models/Student.js
import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    firstName:      { type: String, required: true, trim: true },
    lastName:       { type: String, required: true, trim: true },
    phone:          { type: String, required: true, trim: true },
    email:          { type: String, trim: true, lowercase: true },
    dob:            { type: String },
    gender:         { type: String, enum: ["Male", "Female", "Other", "Prefer not to say", ""] },
    address:        { type: String },
    emergencyName:  { type: String },
    emergencyPhone: { type: String },
    photo:          { type: String },
    seat:           { type: Number, required: true },
    plan:           { type: String, enum: ["Weekly", "Monthly", "Yearly"], required: true },
    joinDate:       { type: String, required: true },
    expiryDate:     { type: String },
    paymentStatus:  { type: String, enum: ["Paid", "Pending", "Failed"], default: "Pending" },
    shift:          { type: String },
    idType:         { type: String },
    idNumber:       { type: String },
    notes:          { type: String },
    isActive:       { type: Boolean, default: true },
    createdBy:      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// ✅ NO pre hook — expiryDate calculated in the route

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);