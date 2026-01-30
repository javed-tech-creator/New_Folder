import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminSignup = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: "Name, email and password required" });
  }

  const exists = await Admin.findOne({ email });
  if (exists) {
    return res.status(409).json({ success: false, error: "Admin already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    name,
    email,
    password: hashed,
    role: role || "admin"
  });

  res.status(201).json({
    success: true,
    message: "Admin created",
    admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
  });
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Email and password required" });
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ success: false, error: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    return res.status(401).json({ success: false, error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("admin_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000
  });

  res.json({
    success: true,
    message: "Login successful",
    admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
  });
};
