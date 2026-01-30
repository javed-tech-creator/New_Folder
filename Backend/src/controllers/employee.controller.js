import Employee from "../models/employee.model.js";
import mongoose from "mongoose";
const Counter = mongoose.model(
  "Counter",
  new mongoose.Schema({
    _id: String,
    seq: Number,
  })
);

export const addEmployee = async (req, res) => {
  try {
    const { name, email, password, phone, department, designation, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: "Name, email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, error: "Password must be at least 6 characters long" });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ success: false, error: "Employee with this email already exists" });
    }

    // Get auto-increment sequence
    const counter = await Counter.findByIdAndUpdate(
      { _id: "employee" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    // Build employeeId
    const year = new Date().getFullYear().toString().slice(2);
    const padded = String(counter.seq).padStart(3, "0");
    const generatedId = `EMP${year}${padded}`;

    // Create employee
    const employee = await Employee.create({
      ...req.body,
      employeeId: generatedId
    });

    res.status(201).json({ success: true, data: employee });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid employee ID" });
    }

    const { email, password, ...updateData } = req.body;

    if (email) {
      const existingEmployee = await Employee.findOne({ 
        email, 
        _id: { $ne: id } 
      });
      
      if (existingEmployee) {
        return res.status(409).json({ 
          success: false, 
          error: "Another employee with this email already exists" 
        });
      }
    }

    if (password && password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        error: "Password must be at least 6 characters long" 
      });
    }

    const updated = await Employee.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updated) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ success: false, error: errors.join(', ') });
    }
    
    if (err.code === 11000) {
      return res.status(409).json({ 
        success: false, 
        error: "Employee with this email already exists" 
      });
    }
    
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid employee ID" });
    }

    const emp = await Employee.findById(id).select('-password');

    if (!emp) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    res.json({ success: true, data: emp });
  } catch (err) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));

    const query = {
      status: { $ne: "inactive" }
    };

    const total = await Employee.countDocuments(query);

    const data = await Employee.find(query)
      .select('-password')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const softDeleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid employee ID" });
    }

    const deleted = await Employee.findByIdAndUpdate(
      id,
      { status: "inactive" },
      { new: true }
    ).select('-password');

    if (!deleted) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    res.json({ success: true, message: "Employee soft deleted successfully", data: deleted });
  } catch (err) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const hardDeleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid employee ID" });
    }

    const removed = await Employee.findByIdAndDelete(id);

    if (!removed) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    res.json({ success: true, message: "Employee permanently deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};