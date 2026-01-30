import mongoose from "mongoose";
const empSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    employeeId: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: String,

    department: {
      type: String,
      enum: ["HR", "Sales", "Tech", "Finance", "Operations"],
      default: "Tech",
    },

    designation: { type: String, default: "Employee" },

    role: {
      type: String,
      enum: ["admin", "hr", "employee"],
      default: "employee",
    },

    joinDate: { type: Date, default: Date.now },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", empSchema);
export default Employee;
